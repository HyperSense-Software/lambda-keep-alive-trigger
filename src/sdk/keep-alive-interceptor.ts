export async function isKeepAlive(event : any)
{
    console.log(event);
    if (event.type == "KeepAlive") return true;
    return false;
}