import devices from "./devices.json";

export async function GET() {
    return Response.json(devices);
}

