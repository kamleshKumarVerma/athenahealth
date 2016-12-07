angular.module("athenaHealth").service("homeService", function() {
	
	this.getAthenistas = function() {
        var athenistas = [
        	{ name : "joondeph breidbart", url: "../../images/greg-joondeph_breidbart_wat.png" },
        	{ name : "anita gupta", url: "../../images/anita_gupta_sf.jpg" },
        	{ name : "ligmie preval", url: "../../images/ligmie_preval_wat.png" },
        	{ name : "kevin weaver", url: "../../images/kevin_weaver_watertown.png" },
        	{ name : "amanda montgomery", url: "../../images/amanda__montgomery_-atlanta_rec.png" },
        	{ name : "andrew kahn", url: "../../images/andrew_kahn_sales_rec.png" },
        	{ name : "stephanie ellis austin", url: "../../images/stephanie_ellis_austin_rec.png" },
        	{ name : "james dantzler atlanta", url: "../../images/james_dantzler_atlanta_rec.png" }
        ];
		return athenistas;
    }

});