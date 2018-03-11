// THE INITIAL DATA
var initialCats = {
    cats: [
        {
            "name": "Catelyn",
            "image": "img/cat-stark.jpg",
            "clicks": 0,
            "id": 1,
            "nickNames": [
                {
                    nickname: "Cate"
            },
                {
                    nickname: "Tully"
            },
                {
                    nickname: "Ned-Ex"
            }
           ]
        },
        {
            "name": "Biglips",
            "image": "img/cat-below.jpg",
            "clicks": 0,
            "id": 2,
            "nickNames": [
                {
                    nickname: "Mouth-to-mouth"
            },
                {
                    nickname: "Small ass"
            },
                {
                    nickname: "Lickable area"
            }
           ]
        },
        {
            "name": "Sunshine",
            "image": "img/cat-happy.jpg",
            "clicks": 0,
            "id": 3,
            "nickNames": [
                {
                    nickname: "Up mood"
            },
                {
                    nickname: "Smily"
            },
                {
                    nickname: "World Peace"
            }
           ]
        }
    ]
};

// The working data prototype object to make each cat

var Cat = function (data) {
    this.id = ko.observable(data.id);
    this.clickCount = ko.observable(data.clicks);
    this.name = ko.observable(data.name);
    this.img = ko.observable(data.image);
    this.nickNames = ko.observableArray(data.nickNames);

    this.level = ko.computed(function () {
        var level;
        var clicks = this.clickCount();
        if (clicks < 10) {
            level = 'hatchling';
        } else if (clicks < 20) {
            level = 'larvae';
        } else if (clicks < 30) {
            level = 'minion';
        } else {
            level = 'replaceable';
        }
        return level;
    }, this);
}

// The OCTOPUS/VIEW (because of the two-way data binding, the view's render functions can exist entirely in the HTML)
var ViewModel = function () {

    var self = this;

    this.catList = ko.observableArray([]); // make the observable data array to put all the cat's working objects in

    initialCats.cats.forEach(function (catItem) { // make a working cat object for each of the cats
        self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable(); // make a current cat variable and set the initial current cat to the cat based on the hash, or if not present to the first cat
    this.setInitialCat = function () {

        var flurl = window.location.href; // grab the url
        var checkhash = flurl.indexOf("#"); // check if the url contains a #-deeplink to a specific cat-id
        if (checkhash != -1) { // if a # is not present on load, index of # is -1
            flurl = flurl.substr(flurl.lastIndexOf('#') + 1); // grab the cat id from the url
            var cat;
            for (i = 0; i < this.catList().length; i++) { //loop over all the cats
                cat = this.catList()[i]; // store the cat in a variable for easier access to its properties
                if (cat.id() == flurl) { //if the cat id from the url matches a cat-id, set the current cat to this cat
                    var index = self.catList().indexOf(cat); // grab the index of the matching cat
                    self.currentCat(this.catList()[index]); // set the current cat to the index of the matching cat
                }
            }
        } else {
            // set our current cat to the first one in the cat list
            this.currentCat(this.catList()[0]);

        }
    }
    this.setInitialCat(); // initialize the setInitialCat function

    this.incrementCounter = function () {
        var number = self.currentCat().clickCount();
        number = Number(number); // change the value to a number type (because form input values are stored as strings)
        number += 1;
        self.currentCat().clickCount(number);
    };

    this.setCat = function (clickedCat) {
        self.currentCat(clickedCat);
    }

    var adminContainer = $('#admincontainer');
    this.toggleAdmin = function () {
        $(adminContainer).toggle();
    };

    this.appUrl = 'file:///C:/Users/Gebruiker/Desktop/ud-front-end-dev/ud-javascript-design-patterns-2016/catclickerpro-knockout/index.html';

}

ko.applyBindings(new ViewModel());