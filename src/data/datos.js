const regionesYComunas = {
    "Región Metropolitana": [
        "Santiago", "Puente Alto", "Maipú", "La Florida", "Las Condes",
        "Providencia", "Ñuñoa", "San Bernardo", "Peñalolén", "La Pintana"
    ],
    "Región de Valparaíso": [
        "Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Quillota",
        "San Antonio", "Los Andes", "Casablanca", "Concón", "Limache"
    ],
    "Región del Biobío": [
        "Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel",
        "San Pedro de la Paz", "Chiguayante", "Hualpén", "Penco", "Tomé"
    ],
    "Región de La Araucanía": [
        "Temuco", "Padre las Casas", "Villarrica", "Angol", "Pucón",
        "Victoria", "Lautaro", "Nueva Imperial", "Collipulli", "Loncoche"
    ],
    "Región de Los Lagos": [
        "Puerto Montt", "Osorno", "Castro", "Puerto Varas", "Ancud",
        "Quellón", "Calbuco", "Frutillar", "Puerto Octay", "Purranque"
    ]
};


export function getRegiones() {
    return Object.keys(regionesYComunas);
}

export function getComunas(region) {
    return regionesYComunas[region] || [];
}