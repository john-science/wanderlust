/** Creata a map from a data file.
    The goal will be to make a map this is:
      accessible in pieces (without loading the whole thing at once),
      loadable from a data file (JSON or KML).
    The map should also have (or allow) for a richness of detail:
      terrain,
      ground cover,
      canopy cover,
      soil type,
      weather,
      water bodies,
      animal population
 */

/** Pre-defined color scale for NLCD land cover categories */
var land_cover_colors = {11: "84,117,168",   /** Open Water */
                         12: "255,255,255",  /** Perennial Ice/Snow */
                         21: "178,201,180",  /** Dev, Open Space */
                         22: "175,190,175",  /** Developed, Low Intensity */
                         23: "161,161,161",  /** Developed, Medium Intensity */
                         24: "148,148,148",  /** Developed High Intensity */
                         31: "210,205,192",  /** Barren Land (Rock/Sand/Clay) */
                         41: "133,199,126",  /** Deciduous Forest  */
                         42: "56,129,78",    /** Evergreen Forest */
                         43: "212,231,176",  /** Mixed Forest */
                         51: "175,150,60",   /** Dwarf Scrub - Alaska */
                         52: "220,202,143",  /** Scrubland */
                         71: "253,233,170",  /** Grassland */
                         72: "209,209,130",  /** Sedge - Alaska */
                         73: "163,204,81",   /** Lichens - Alaska */
                         74: "130,186,158",  /** Moss - Alaska */
                         81: "209,209,130",  /** Pasture - Hay */
                         82: "163,204,81",   /** Crops */
                         90: "58,105,55",    /** Woody Wetlands */
                         95: "125,145,81"}   /** Emergent Herbaceous Wetlands */

/** NLCD canopy comes in percentage (0-99). We will break that range into 10 pieces (0-9) for drawing*/
var canopy_symbols = [' ', ' ', "'", '"', "♠", "♠", "♠", "♣", "♣", "♣"];
var canopy_titles = [' ', ' ', "Grassland", 'Shrubland', "Forest", "Forest", "Forest", "Forest", "Dense Forest", "Dense Forest"];

/** init hill shade rendering object */
HillShade.init(map_data["elevation"]);
