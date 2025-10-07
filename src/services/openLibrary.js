const SUBJECT_BASE = "https://openlibrary.org/subjects";
const COVER_BASE = "https://covers.openlibrary.org/b";

function coverUrlForm(item){
    if (item.cover_id) return `${COVER_BASE}/id/${item.cover_id}-M.jpg`;
    const olid = item.cover_edition_key || item.edition_key?.[0];
    if(olid) return `${COVER_BASE}/olid/${olid}-M.jpg`;
}

export async function getBooksBySubject(subject, limit=50){
    const url = `${SUBJECT_BASE}/${encodeURIComponent(subject)}.json?limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Couldn't obtain books");
    const data =await res.json();
    const items = data.works || data.books || [];

    return items.map( w =>({
        id: w.key,
        title: w.title || "untitled",
        author: w.authors?.[0]?.name || "uknown",
        cover: coverUrlForm(w),
    }));
}