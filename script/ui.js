( function () { 
    'use strict';

    var $addGold = document.querySelector(".add-btn");
    var $addCat = document.querySelector(".cat-btn");
    var $feed = document.querySelector(".feed-btn");
    var $closeModal = document.querySelector(".err-btn");

    function addFish(e){
        aquafun.addFishFunc(e);
    }

    $addGold.addEventListener("click", addFish);

    $addCat.addEventListener("click", addFish);


    $feed.addEventListener("click", function() {
        aquafun.feed();
    })

    $closeModal.addEventListener("click", function() {
        aquafun.closeModal();
    })
    
    
    aquafun.onDirt(function(){
        $addGold.removeEventListener("click", addFish);
        $addCat.removeEventListener("click", addFish);
        $feed.removeEventListener("click", function() {
            aquafun.feed();
        })
    });
    
}) ();