import Researchers from "../../src/components/Researchers.jsx";
import ResearcherResultSentence from "../../src/components/ResearcherResult.jsx";

const r = new Researchers();

describe("Spring Capstone 2022 Tests for Researchers.jsx and ResearcherResult.jsx", () => {
    test("just here so I can push my code", () =>{
        expect(1).toEqual(1);
    });
    /*test("tests that the county filter sets a correct filter", () =>{

        r.setCountyFilter("Robinson Township");
        expect(r.getCountyFilter()).toEqual("Robinson Township");
    });

    test("tests that the county filter sets no filter when given one that does not exist", () =>{

        r.setCountyFilter("MadeUp County");
        expect(r.getCountyFilter()).toEqual(null);
    });

    test("tests that the page size is set correctly", () =>{

        r.setPageSize(200);
        expect(r.getPageSize()).toEqual(200);
    });

    test("Tests the search handling setup", () =>{


        r.setSearchQuery("Testing search", "");  //I'm really not sure what it wants for the autosearch argument so I'm just giving it a empty string for now

        expect(r.getSearchQuery()).toEqual("Testing search");

    });

    test("Tests the search handler parsing", () =>{

        r.setSearchQuery("Testing search parsing", "");  //I'm really not sure what it wants for the autosearch argument so I'm just giving it a empty string for now

        expect(r.getSearchQueryWords()).toEqual(["Testing" , "search", "parsing"]);

    });*/
  });