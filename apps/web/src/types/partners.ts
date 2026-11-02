export type Organization = {
    id: string,
    name: string,
    logo: string,
    services: string,
    contacts: string[]
    web?: string,
}

export type OrganizationEvent = {
    organizationId: string,
    name: string,
    time: string,
    description: string,
    date?: Date,
    to?: Date,
    dayWeek?: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
    location?: string,
}