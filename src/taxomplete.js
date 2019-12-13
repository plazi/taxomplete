import Awesomplete from "awesomplete";
import SparqlEndpoint from "@retog/sparql-client";

export default class Taxomplete {

    constructor(input, sparqlEndpoint) {
        if (sparqlEndpoint) {
            if (sparqlEndpoint.getSparqlResultSet) {
                this._sparqlEndpoint = sparqlEndpoint;
            } else {
                this._sparqlEndpoint = new SparqlEndpoint(sparqlEndpoint);
            }
        } else {
            this._sparqlEndpoint = new SparqlEndpoint("https://treatment.ld.plazi.org/sparql");
        }
        this._input = input;
        let previousValue = input.value;

        let self = this;

        let awesomplete = new Awesomplete(input);
        awesomplete.maxItems = 15;
        awesomplete.sort = false;

        input.onkeyup = (e) => {
            if ((input.value.length >= 2) && (e.key !== "Enter") && (input.value !== previousValue)) {
                populateSuggestions();
            }
            return true;
        };

        input.addEventListener("awesomplete-selectcomplete", (e) => {
            let wordCount = input.value.trim().split(" ").length;
            if (wordCount === 1) {
                populateSuggestions();
                awesomplete.open();
            }
            if (wordCount === 2) {
                this.lookup();
            }
        });

        function populateSuggestions() {
            let value = input.value.toString();
            previousValue = value;
            if (value.indexOf(" ") === -1) {
                Promise.all([getGenusSuggestions(value), getCombinedSuggestions(value)]).then(r => {
                    let gs = r[0].map(i => i + " ");
                    let cs = r[1];
                    awesomplete.list = gs.concat(cs);
                });
            } else {
                let parts = value.split(" ").filter((s) => s.length > 0)
                if (parts.length > 1) {
                    getSpeciesSuggestions(parts[1], parts[0]).then(ss => {
                        awesomplete.list = ss.map(i => parts[0] + " " + i);
                    });
                } else {
                    getSpeciesSuggestions("", parts[0]).then(ss => {
                        awesomplete.list = ss.map(i => parts[0] + " " + i);
                    });
                }
            }
        }

        awesomplete.filter = (t, i) => {
            let foundPos = t.toLowerCase().indexOf(i.toLowerCase());
            return (foundPos === 0) || (foundPos === (t.indexOf(" ") + 1));
        };

        let origItem = awesomplete.item;
        awesomplete.item = (suggestion, i) => {
            let foundPos = suggestion.toLowerCase().indexOf(i.toLowerCase());
            let suggestionSpacePos = suggestion.substr(0, suggestion.length - 1).indexOf(" ");
            let html;
            if (suggestionSpacePos === -1) {
                html = "<mark>" + suggestion.substring(0, i.length) + "</mark>" + suggestion.substring(i.length);
            } else if (i.indexOf(" ") === -1) {
                html = suggestion.substring(0, suggestionSpacePos + 1) + "<mark>" +
                        suggestion.substring(suggestionSpacePos + 1, suggestionSpacePos + 1 + i.length) +
                        "</mark>" + suggestion.substring(suggestionSpacePos + 1 + i.length);
            } else if (i.indexOf(" ") !== -1) {
                html = "<mark>" +
                        suggestion.substring(0, i.length) +
                        "</mark>" + suggestion.substring(i.length);
            }
            let result = document.createElement("li");
            result.setAttribute("aria-selected", "false");
            result.innerHTML = html;
            return result;
        };


        /**
         * 
         * @param {type} prefix
         * @returns A promise for an array of matching genera
         */
        function getGenusSuggestions(prefix) {
            let query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                    "PREFIX dwc: <http://rs.tdwg.org/dwc/terms/>\n" +
                    "PREFIX dwcfp: <http://filteredpush.org/ontologies/oa/dwcFP#>\n" +
                    "PREFIX tp: <https://vocab.plazi.org/taxomplete/>\n" +
                    "SELECT DISTINCT ?genus WHERE {\n" +
                    "?sub dwc:genus ?genus .\n" +
                    "?sub rdf:type dwcfp:TaxonName.\n" +
                    "?sub tp:genusPrefix \"" + prefix.toLowerCase().substr(0,2) + "\".\n" +
                    "FILTER REGEX(?genus, \"^" + prefix + "\",\"i\")\n" +
                    "} ORDER BY UCASE(?genus) LIMIT 10";
            return self._sparqlEndpoint.getSparqlResultSet(query).then(json => {
                return json.results.bindings.map(binding => binding.genus.value);
            });
        }

        function getSpeciesSuggestions(prefix, genus) {
            let query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                    "PREFIX dwc: <http://rs.tdwg.org/dwc/terms/>\n" +
                    "PREFIX dwcfp: <http://filteredpush.org/ontologies/oa/dwcFP#>\n" +
                    "PREFIX tp: <https://vocab.plazi.org/taxomplete/>\n" +
                    "SELECT DISTINCT ?species WHERE {\n" +
                    "?sub dwc:genus \"" + genus + "\" .\n" +
                    "?sub dwc:species ?species .\n" +
                    "?sub rdf:type dwcfp:TaxonName.\n" +
                    (prefix.length > 1 ? "?sub tp:speciesPrefix \"" + prefix.toLowerCase().substr(0,2) + "\".\n" : "") +
                    "FILTER REGEX(?species, \"^" + prefix + "\",\"i\")\n" +
                    "} ORDER BY UCASE(?species) LIMIT 10";
            return self._sparqlEndpoint.getSparqlResultSet(query).then(json => {
                return json.results.bindings.map(binding => binding.species.value);
            });
        }

        function getCombinedSuggestions(prefix) {
            let query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                    "PREFIX dwc: <http://rs.tdwg.org/dwc/terms/>\n" +
                    "PREFIX dwcfp: <http://filteredpush.org/ontologies/oa/dwcFP#>\n" +
                    "PREFIX tp: <https://vocab.plazi.org/taxomplete/>\n" +
                    "SELECT DISTINCT ?genus ?species WHERE {\n" +
                    "?sub dwc:genus ?genus .\n" +
                    "?sub dwc:species ?species .\n" +
                    "?sub rdf:type dwcfp:TaxonName.\n" +
                    (prefix.length > 1 ? "?sub tp:speciesPrefix \"" + prefix.toLowerCase().substr(0,2) + "\".\n" : "") +
                    "FILTER REGEX(?species, \"^" + prefix + "\",\"i\")\n" +
                    "} ORDER BY UCASE(?species) LIMIT 10";
            return self._sparqlEndpoint.getSparqlResultSet(query).then(json => {
                return json.results.bindings.map(binding => binding.genus.value + " " + binding.species.value);
            });
        }
    }

    lookup() {
        this.action(this._input.value.toString());
    }

    action(value) {
        console.log("Value "+value+" selected, overwrite action(value) method to have something happen.")
    }

}