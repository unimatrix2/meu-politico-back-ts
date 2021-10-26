export const enum IPrivilegesEnum {
    Usr = 'usuário',
    Mod = 'moderador',
    Adm = 'admin'
};

export const enum IModerationEnum {
    Edit = 'editar',
    Edited = 'editado',
    Archive = 'arquivar',
    Archived = 'arquivado',
    Publish = 'publicar',
    Published = 'publicado'
}

export const enum IStatesEnum {
    AC = 'AC', AL = 'AL', AP = 'AP',
    AM = 'AM', BA = 'BA', CE = 'CE',
    DF = 'DF', ES = 'ES', GO = 'GO',
    MA = 'MA', MT = 'MT', MS = 'MS',
    MG = 'MG', PA = 'PA', PB = 'PB',
    PR = 'PR', PE = 'PE', PI = 'PI',
    RJ = 'RJ', RN = 'RN', RS = 'RS',
    RO = 'RO', RR = 'RR', SC = 'SC',
    SP = 'SP', SE = 'SE', TO = 'TO'
}

export const enum IPositionsEnum {
    VRDR = 'Vereador',
    PFTO = 'Prefeito',
    DPES = 'Dep. Estadual',
    GVNR = 'Governador',
    DPFD = 'Dep. Federal',
    SNDR = 'Senador',
    PR = 'Presidente',
    CRIN = 'Cargo Indireto',
    OTHR = 'Outro',
    NA = 'Não sei',
    CDTOVRDR = 'Candidato - Vereador',
    CDTOPFTO = 'Candidato - Prefeito',
    CDTODPES = 'Candidato - Dep. Estadual',
    CDTOGVNR = 'Candidato - Governador',
    CDTODPFD = 'Candidato - Dep. Federal',
    CDTOSNDR = 'Candidato - Senador',
    CDTOPR = 'Candidato - Presidente'
}

export const enum IElectionTypeEnum {
	ORDN = 'Ordinárias Nacionais',
	ORDM = 'Ordinárias Municipais',
	SUPL = 'Suplementares',
	PLEB = 'Plebiscito',
	REFE = 'Referendo'
}