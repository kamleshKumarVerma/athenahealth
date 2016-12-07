angular.module("athenaHealth").service("homeService", function() {
	
	this.getAthenistas = function() {
        var athenistas = [
        	{ name : "joondeph breidbart", src: "../../images/greg-joondeph_breidbart_wat.png" },
        	{ name : "anita gupta", src: "../../images/anita_gupta_sf.jpg" },
        	{ name : "ligmie preval", src: "../../images/ligmie_preval_wat.png" },
        	{ name : "kevin weaver", src: "../../images/kevin_weaver_watertown.png" },
        	{ name : "amanda montgomery", src: "../../images/amanda__montgomery_-atlanta_rec.png" },
        	{ name : "andrew kahn", src: "../../images/andrew_kahn_sales_rec.png" },
        	{ name : "stephanie ellis austin", src: "../../images/stephanie_ellis_austin_rec.png" },
        	{ name : "james dantzler atlanta", src: "../../images/james_dantzler_atlanta_rec.png" }
        ];
		return athenistas;
    }

});