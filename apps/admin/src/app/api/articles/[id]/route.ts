import {createClient} from "@/lib/supabase/server";

export async function GET(req: Request,
                          {params}: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();

    const {id} = await params;

    const {data, error} = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();

    if (error) {
        return Response.json({error}, {status: 500});
    }

    return Response.json(data);
}