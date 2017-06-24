// the observer list
function ObserverList() {
    this.observerList = [];
}
ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj);
}
ObserverList.prototype.removeAt = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList.splice(index, 1);
    }
}
ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
}
Observer.prototype.indexOf = function (obj, startIndex) {
    var i = startIndex;
    while (i < this.observerList.length) {
        if (this.observerList[i] == obj) {
            return i;
        }
    }
    return -1;
}
ObserverList.prototype.count = function () {
    return this.observerList.length;
}

//the subject
function Subject() {
    this.observerList = new ObserverList();
}
Subject.prototype.addObserver = function (observer) {
    this.observerList.add(observer);
}
Subject.prototype.removeObserver = function (observer) {
    this.observerList.removeAt(this.observerList.indexOf(observer, 0));
}

Subject.prototype.notify = function (context) {
    var observersCount = this.observerList.count();
    for (var i = 0; i < observersCount; i++) {
        this.observerList.get(i).update(context);
    }
}

// the observer 
function Observer() {
    this.update = function () { }
}

//extend an object with an extension
function extend(obj, extension) {
    for (var key in extension) {
        obj[key] = extension[key];
    }
}

// referencce to DOM elements in index.html file
var mainCheckbox = document.getElementById("mainCheckbox"),
    addBtn = document.getElementById("addNewObserver"),
    container = document.getElementById("observersContainer");

// extent tha main check box with the subject Cass
extend(mainCheckbox, new Subject());

mainCheckbox.onclick = function () {
    mainCheckbox.notify(mainCheckbox.checked);
}

addBtn.onclick = addNewObserver;

function addNewObserver() {
    // Create a new checkbox 
    var check = document.createElement("input");
    check.type = "checkbox";

    // Extend the checkbox with the Observer class
    extend(check, new Observer());

    // Override with custom update behaviour
    check.update = function (value) {
        this.checked = value;
    };

    // Add the new observer to our list of observers
    // for our main subject
    mainCheckbox.addObserver(check);

    // Append the item to the container div
    container.appendChild(check);
}

