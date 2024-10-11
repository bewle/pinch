import { z } from "zod";

const deviceSchema = z.object({
    model: z.string(),
    logicalWidth: z.number(),
    logicalHeight: z.number(),
    physicalWidth: z.number(),
    physicalHeight: z.number(),
});

const devicesSchema = z.array(deviceSchema);

export type Device = z.infer<typeof deviceSchema>;

export async function getDevices({
    flavor
}: {
    flavor: string;
}): Promise<Device[]> {
    const res = await fetch(`/api/${flavor}-devices`);
    const data: unknown = await res.json();

    try {
        return devicesSchema.parse(data);

    } catch (error) {
        console.error(error);
        return [];
    }
}