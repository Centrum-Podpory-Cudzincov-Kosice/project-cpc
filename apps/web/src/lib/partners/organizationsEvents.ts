import {OrganizationEvent} from "../../types/partners";

// Example activities for the partner cards; replace these with confirmed schedules and contacts.
export const organizationsEvents: OrganizationEvent[] = [
    // Slovenská Humanitná Rada
    {organizationId: "0", name: "Hodina slovenčiny", time: "16:00 – 17:00", description: "Konverzácia a precvičovanie slovenčiny pre začiatočníkov.", dayWeek: "thu"},
    {organizationId: "0", name: "Klub mládeže", time: "16:00 – 17:00", description: "Tvorivé aktivity, hry a spoločné stretnutie pre mladých.", dayWeek: "tue", location: "Komunitné centrum"},
    {organizationId: "0", name: "Rodinné popoludnie", time: "14:00 – 16:00", description: "Voľnočasový program pre deti a rodičov.", dayWeek: "sat"},
    {organizationId: "0", name: "Deň otvorených dverí", time: "10:00 – 14:00", description: "Predstavenie aktivít a poradenstvo pre rodiny.", date: new Date(2026, 10, 21)},

    // Človek v ohrození
    {organizationId: "1", name: "Pracovné poradenstvo", time: "09:00 – 12:00", description: "Individuálna pomoc pri hľadaní práce a orientácii na trhu práce.", dayWeek: "mon", date: new Date(2026, 10, 2), to: new Date(2026, 11, 31)},
    {organizationId: "1", name: "Príprava životopisu", time: "13:00 – 15:00", description: "Praktický workshop: životopis, motivačný list a pracovný pohovor.", dayWeek: "wed", location: "Poradenské centrum"},
    {organizationId: "1", name: "Informačné stretnutie pre uchádzačov o prácu", time: "10:00 – 12:00", description: "Základné informácie o hľadaní zamestnania a pracovných podmienkach.", date: new Date(2026, 10, 12)},

    // Liga za ľudské práva
    {organizationId: "2", name: "Právne poradenstvo", time: "09:00 – 12:00", description: "Konzultácie k pobytu, azylu a zlúčeniu rodiny.", dayWeek: "tue", location: "Právna poradňa"},
    {organizationId: "2", name: "Právne poradenstvo", time: "13:00 – 16:00", description: "Individuálne konzultácie po predchádzajúcom objednaní.", dayWeek: "thu"},
    {organizationId: "2", name: "Práva a povinnosti cudzincov", time: "17:00 – 18:30", description: "Otvorená informačná beseda s právnikom.", date: new Date(2026, 10, 18)},

    // Mareena
    {organizationId: "3", name: "Kurz slovenčiny", time: "17:00 – 18:30", description: "Skupinová lekcia slovenčiny pre mierne pokročilých.", dayWeek: "mon", location: "Vzdelávacie centrum"},
    {organizationId: "3", name: "Konverzačný klub", time: "17:00 – 18:00", description: "Neformálne precvičovanie slovenčiny pri spoločných aktivitách.", dayWeek: "wed"},
    {organizationId: "3", name: "Komunitné raňajky", time: "09:30 – 11:30", description: "Stretnutie susedov, zdieľanie skúseností a predstavenie miestnych služieb.", date: new Date(2026, 10, 28), location: "Komunitná záhrada"},

    // Psychosociálne centrum
    {organizationId: "4", name: "Podporná skupina", time: "16:00 – 17:30", description: "Bezpečný priestor na rozhovor a vzájomnú podporu.", dayWeek: "tue", location: "Psychosociálne centrum"},
    {organizationId: "4", name: "Individuálne konzultácie", time: "09:00 – 12:00", description: "Psychologická podpora po predchádzajúcom objednaní.", dayWeek: "fri"},
    {organizationId: "4", name: "Stretnutie o zvládaní stresu", time: "15:00 – 16:30", description: "Praktické techniky na podporu duševnej pohody.", date: new Date(2026, 10, 24)},

    // Rifugio
    {organizationId: "5", name: "Komunitné poradenstvo", time: "10:00 – 12:00", description: "Pomoc pri orientácii v službách a každodenných záležitostiach.", dayWeek: "mon", location: "Komunitné centrum Rifugio"},
    {organizationId: "5", name: "Klub pre rodiny", time: "15:00 – 17:00", description: "Spoločné tvorivé a voľnočasové aktivity pre rodičov a deti.", dayWeek: "thu"},
    {organizationId: "5", name: "Susedské stretnutie", time: "14:00 – 16:00", description: "Neformálne stretnutie komunity pri čaji a spoločných aktivitách.", date: new Date(2026, 11, 5)},
];
