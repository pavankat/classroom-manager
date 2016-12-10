students = [
	{name: "Jeffrey Chou", tier: 1, clas: 1024 },
	{name: "John Krug", tier: 1, clas: 1024 },
	{name: "Nuno Tavares", tier: 1, clas: 1024 },
	{name: "Raymond McCan", tier: 1, clas: 1024 },
	{name: "Rhyna Silva", tier: 1, clas: 1024 },
	{name: "Frank Villafane", tier: 2, clas: 1024 },
	{name: "Hero Khemchandani", tier: 2, clas: 1024 },
	{name: "Ishani Amin", tier: 2, clas: 1024 },
	{name: "John Molin", tier: 2, clas: 1024 },
	{name: "Nicholas Vincent", tier: 2, clas: 1024 },
	{name: "Steven Gissubel", tier: 2, clas: 1024 },
	{name: "Arron Linton", tier: 3, clas: 1024 },
	{name: "Douglas Wallner", tier: 3, clas: 1024 },
	{name: "John Bruno", tier: 3, clas: 1024 },
	{name: "Timothy King", tier: 3, clas: 1024 },
	{name: "Christa Hazel", tier: 4, clas: 1024 },
	{name: "Ivonne Komis", tier: 5, clas: 1024 },
	{name: "Krista Charner", tier: 5, clas: 1024 },
	{name: "Mark Sedlazek", tier: 5, clas: 1024 },
	{name: "Michael Yezo", tier: 5, clas: 1024 },
	{name: "Braniel Pichardo", tier: 5, clas: 1024 },
	{name: "Joey Rodrigues", tier: 5, clas: 1024 },
	{name: "Richard Rosius", tier: 5, clas: 1024 },
	{name: "Sheri Mathews", tier: 5, clas: 1024 },
	{name: "Tyler Rosen", tier: 5, clas: 1024 },
	{name: "Allen Chen", tier: 5, clas: 1024 },
	{name: "Alan Chu", tier: 1, clas: 1025 },
	{name: "Alex Rosenkranz", tier: 1, clas: 1025 },
	{name: "Alisa Schink", tier: 1, clas: 1025 },
	{name: "Andrew Federowicz", tier: 1, clas: 1025 },
	{name: "Christine Chong", tier: 1, clas: 1025 },
	{name: "Derick Alfaro", tier: 1, clas: 1025 },
	{name: "Kristen Manning", tier: 1, clas: 1025 },
	{name: "Sunita Chowdhury", tier: 1, clas: 1025 },
	{name: "Vincent Visconti", tier: 1, clas: 1025 },
	{name: "Ann Visconti", tier: 2, clas: 1025 },
	{name: "Anna Kimtis", tier: 2, clas: 1025 },
	{name: "Kathleen Catlett", tier: 2, clas: 1025 },
	{name: "Matt Stein", tier: 2, clas: 1025 },
	{name: "Michael Emmanuel", tier: 2, clas: 1025 },
	{name: "Anthony Carnese", tier: 3, clas: 1025 },
	{name: "Christopher Wahlers", tier: 3, clas: 1025 },
	{name: "Patrick Loughrey", tier: 3, clas: 1025 },
	{name: "Robert Benbenek", tier: 3, clas: 1025 },
	{name: "Jon Salamat", tier: 3, clas: 1025 },
	{name: "Thomas Li", tier: 3, clas: 1025 },
	{name: "Dennis hall jr" , tier: 4, clas: 1025 },
	{name: "Loretta Agyemang", tier: 4, clas: 1025 },
	{name: "Richard Spence", tier: 4, clas: 1025 },
	{name: "Shirley Liu", tier: 4, clas: 1025 },
	{name: "Brian Bennett", tier: 6, clas: 1025 } 
] 

for (var i=0; i<students.length; i++){
	students[i].present = true;
}

var classRoomModel = function(stds) {
	var self = this;
	self.students = ko.observableArray(ko.utils.arrayMap(stds, function(st) {
	    return { name: st.name, tier: ko.observable(st.tier), clas: st.clas, present: ko.observable(st.present) };
	}));

	self.radioClass = ko.observable("both");

	this.studentsToShow = ko.pureComputed(function() {
	    // Represents a filtered list of students
	    // i.e., only those matching the "typeToShow" condition
	    var clas = this.radioClass();
	    if (clas == "both") return this.students();
	    return ko.utils.arrayFilter(this.students(), function(stud) {
	        return stud.clas == clas;
	    });
	}, this);

	self.sortFunction = function(a, b) {
	    return a.tier() > b.tier() ? 1 : -1;  
	};

	//filter students based on class and tier
	self.sortStudents = ko.computed(function() {
		var clasFil = this.radioClass();

	    if (clasFil == "both") {
	    	return this.students.slice().sort(this.sortFunction);
	    }

    	var studs = ko.utils.arrayFilter(this.students(), function(st) {
            return st.clas == clasFil;
        });

        return studs.slice().sort(this.sortFunction);
	    
	}, self);
	                     
	self.rows = ko.observableArray();

	self.addRow = function() {
	    self.rows.push({
	        tables: ko.observableArray()
	    });
	};

	self.addTable = function(row) {
	    row.tables.push({
	        seats: 4,
	        sittingStudents: ko.observableArray()
	    });
	};

	self.removeRow = function(row){
		self.rows.remove(row);
	}

	self.removeTable = function(table){
		$.each(self.rows(), function() { this.tables.remove(table) })
	}

	self.togglePresence = function(student){
		student.present(!student.present())
	}

	//this is where we will place students to tables
	self.placeStudents = function(){
		var self = this;
		var students = [];

		self.rows().forEach(function(row,i){
			//console.log(row, i, 'row')
			if (row.tables().length > 0){
				row.tables().forEach(function(table, j){
					//console.log(table, j, 'table')
					//place the max amount of students at this table
					var seatCount = 1;

					while(seatCount <= table.seats){
						//get any random student
						var ranStud = self.students()[Math.floor(Math.random()*self.students().length)];

						//if student present and the student hasn't been placed somewhere
						//account for class filter
						debugger;
						if ((ranStud.present() == true) && (students.indexOf(ranStud.name) == -1)){
							console.log('in here')
							table.sittingStudents.push(ranStud);
							students.push(ranStud.name);
						}

						//console.log(table);
						//console.log(table.seats, 'seats');
						// this.students().forEach(function(student, k){
						// 	var tier = student().tier;
						// 	table.sittingStudents.push(student)
						// });
						seatCount++;
					}
				});
			}
		});

		//debugger; 
		//shows students at the tables:
		//this.rows()[0].tables()[0].sittingStudents()
	}

	self.cleanView = function(){
		$('.clear').toggle();
	}

};

ko.applyBindings(new classRoomModel(students), document.querySelector('#classRoom'));
