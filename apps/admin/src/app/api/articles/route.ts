import {createClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const supabase = await createClient();

    const {searchParams} = new URL(req.url);

    const type = searchParams.get("type");
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    const from = fromParam !== null ? Number(fromParam) : 0;
    const to = toParam !== null ? Number(toParam) : 2;

    if (!type) {
        return Response.json(
            {error: "Missing type parameter"},
            {status: 400}
        );
    }

    if (
        !Number.isInteger(from) ||
        !Number.isInteger(to) ||
        from < 0 ||
        to < from
    ) {
        return Response.json(
            {error: "Invalid from/to parameters"},
            {status: 400}
        );
    }

    const {data, error, count} = await supabase
        .from("articles")
        .select("id,title_sk,date", {count: "exact"})
        .eq("type", type)
        .order("date", {ascending: false})
        .range(from, to);

    if (error) {
        return Response.json({error}, {status: 500});
    }

    return Response.json({
        articles: data,
        total: count,
    });
}

export async function POST(req: Request) {
    const supabase = await createClient();

    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const {data: profile} = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return NextResponse.json({error: 'Forbidden'}, {status: 403});
    }

    const body = await req.json();

    const {data, error} = await supabase
        .from('articles')
        .insert(body);

    return NextResponse.json({data, error});
}