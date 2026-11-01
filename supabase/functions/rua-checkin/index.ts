import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const RUA_BASE = "https://api.rua.chat";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36 Edg/156.0.0.0";

Deno.serve(async (req: Request) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: configData, error: configError } = await supabase
      .from("rua_auth_config")
      .select("refresh_token")
      .eq("id", "main")
      .single();

    if (configError || !configData?.refresh_token) {
      return new Response(
        JSON.stringify({ success: false, error: "No refresh token configured", details: configError }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const currentRefreshToken = configData.refresh_token;

    const refreshRes = await fetch(`${RUA_BASE}/api/user/auth/refresh`, {
      method: "POST",
      headers: {
        "accept": "application/json, text/plain, */*",
        "content-type": "application/json",
        "origin": RUA_BASE,
        "referer": `${RUA_BASE}/rewards/`,
        "user-agent": USER_AGENT,
        "cookie": `new_api_refresh=${currentRefreshToken}; new_api_has_session=1`,
      },
    });

    const setCookieHeader = refreshRes.headers.get("set-cookie") || "";
    let newRefreshToken = currentRefreshToken;
    const refreshMatch = setCookieHeader.match(/new_api_refresh=([^;]+)/);
    if (refreshMatch && refreshMatch[1]) {
      newRefreshToken = refreshMatch[1];
    }

    const refreshData = await refreshRes.json().catch(() => null);

    if (!refreshRes.ok || !refreshData?.success || !refreshData?.data?.access_token) {
      const errPayload = {
        success: false,
        stage: "refresh",
        status: refreshRes.status,
        data: refreshData,
      };
      await supabase.from("rua_checkin_logs").insert({
        executed_at: new Date().toISOString(),
        response_body: JSON.stringify(errPayload),
      });
      return new Response(JSON.stringify(errPayload), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (newRefreshToken !== currentRefreshToken) {
      await supabase
        .from("rua_auth_config")
        .update({ refresh_token: newRefreshToken, updated_at: new Date().toISOString() })
        .eq("id", "main");
    }

    const accessToken = refreshData.data.access_token;

    const checkinRes = await fetch(`${RUA_BASE}/api/user/checkin`, {
      method: "POST",
      headers: {
        "accept": "application/json, text/plain, */*",
        "content-type": "application/json",
        "origin": RUA_BASE,
        "referer": `${RUA_BASE}/rewards/`,
        "user-agent": USER_AGENT,
        "authorization": `Bearer ${accessToken}`,
      },
    });

    const checkinData = await checkinRes.json().catch(() => null);

    const resultPayload = {
      success: checkinRes.ok && checkinData?.success,
      stage: "checkin",
      status: checkinRes.status,
      message: checkinData?.message,
      data: checkinData,
    };

    await supabase.from("rua_checkin_logs").insert({
      executed_at: new Date().toISOString(),
      response_body: JSON.stringify(resultPayload),
    });

    return new Response(JSON.stringify(resultPayload), {
      status: checkinRes.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
