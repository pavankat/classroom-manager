increasing student confidence about working on existing applications (not from ground up)

	coding out an application 
		-> have students build on it

	work with developers on existing open source projects
		reddit programming buddies

	"work experience": open source.
-----
anonymously
	-> give the rubric out to students
	-> and have them grade each other as part of their hw
-----
personality into it
follow through
self efficacy
-----

arpad - ucla - omar
	it is true you get only one chance at a compan y(epr year - airbnb

	but if that's holding you back then you need to find 5 jobs you don't care about


company mentoring app
-----
	we could do that

	[2:36]  
	I was thinking around career

	[2:36]  
	like you could mentor a new SS

	[2:36]  
	or you could mentor a new academic

	[2:36]  
	a new academic could mentor a new admissions

	[2:36]  
	vice versa

	[2:36]  
	still thinking about it

	[2:36]  
	I can write a mini app to help do it

	[2:36]  
	if we figure out what the pairing would be

	Brett Payne [2:39 PM]  
	the pairing can and should rotate, too, right? building great relationships is only as good as the system which allows it to happen perpetually

	Pavan Katepalli [2:40 PM]  
	that’s smart

	[2:40]  
	perhaps it could be

	[2:40]  
	what department do you want to learn more about
	
	Brett Payne [2:40 PM]  
	admissions

	[2:40]  
	the instructor analytics team

	Pavan Katepalli [2:41 PM]  
	hmm

	Brett Payne [2:41 PM]  
	Rutgers/UCF/any mature market with multiple terms in play

	Pavan Katepalli [2:41 PM]  
	it could be different categories

	[2:41]  
	and we could associate each one

	[2:41]  
	with a different set of people



other ideas
-----
-> poll before each class

-> easily make polls 
	- and see what percentage of these people also voted on this etc
	- profile view of each students' data
	- see the pool of what made each percentage block
		- 4 tier 1s, 2 tier 2s, etc

do now questions at the end of class see if people who did the pre class work understood it better than students who didn't


-> call on someone - similar code to ruby file 

-> randomize compliment with fun gif from gify api

take survey on 
	where you work remotely
	where you live
	-> map of students for everyone

	- time they spend outside class

	group people that are closest to each other

take polls

match people based on similar answers

match people based on incorrect or correct -> easily split 
the class so you can teach one part and a TA can teach another.








to do
-----
- update tiers for my students
- efficiency - instead of putting students into an array and checking if the randomly picked student is in the array
	- randomly pick a student and remove that student from a single list (maybe clone it from students)
- use classroom filter
	- //wrong need to find the length of students that are present for both classes, for just 1024 or 1025

	logic for like to like groups
		- groups must be min 2 (preferred) and max 3 
		- max group size is 3, 

		- group members should never be off by 1 level 
		- always prefer the same level with each other
		-- [1, 1, 1], [2, 2] INSTEAD OF [1, 1], [1, 2, 2]

I should read up on grouping theory in math 
and see how others have implemented grouping algorithms

	input => output
		[1] => [1]
		[1,3] => [1], [3] 
		[1,2] => [1, 2]
		[1,2,3] => [1,2], [3]
		[1,2,3,4] => [1,2], [3,4]
		[1,2,3,4,5] => [1,2], [3], [4,5]

		[1, 1, 1, 2, 2] => [1, 1, 1], [2, 2]
		-> [1,1,1], [2, 2] 
		DONE
		--> 3, 2
		---> 1 odd, 1 even (ordered), length of array is 5
		-OBSERVATION 5/2 is 2 remainder 1 

		[1, 1, 1, 1, 2, 2, 3, 4, 5] => [1, 1], [1,1] [2, 2, 3], [4, 5]
		-> [1, 1, 1, 1], [2, 2], [3], [4], [5]
		    [1, 1] [1, 1], [2, 2, 3], [4, 5]



		THEN GROUP INTO TWOS [1,1], [1,1], [2,2], [3,4], [5]
		BUT THERE'S ONE LEFT OVER! SO
		SEE if there's a tier near that left over (indexOf search for lonely one -1 or +1 will do it)
		THERE IS ONE (4)
		so take it 
		now [1,1], [1, 1], [2,2], [3], [4,5]
		now [1,1], [1,1], [2,2,3], [4,5]
		I couldn't go to the [4,5] one because 5 is two more than 3 not 1 more or 1 less

		--> 4, 2, 1, 1, 1
		---> even, even, odd, odd, odd
		----> 2 evens, 3 odds (ordered), length of array is 9
		-OBSERVATION 9/2 is 4 remainder 1, 9/3 is 3

		[1, 2, 2, 3, 4, 5] => [1, 2], [2, 3], [4, 5]
		-> [1], [2, 2], [3], [4], [5]
		-->1, 2, 1, 1, 1
		---> odd, even, odd, odd, odd
		----> 1 odd, 1 even, 3 odds, length of array is 6
		-OBSERVATION -> must think harder

		[1,1,1,2,2,2] => [1,1,1], [2,2,2]
		-> [1,1,1], [2,2,2]
		--> 3, 3
		---> odd, odd
		----> 2 odds (consecutive), length of array is 6
		-OBSERVATION so 6/2 is 3 -> three is the length of two groups

		[1,1,1,1,1,2,2,2,2,2] => [1,1,1], [1,1], [2,2,2], [2,2]
		-> [1,1,1], [2,2,2]
		--> 5, 5
		---> odd, odd
		----> 2 odds (consecutive), length of array is 6
		-OBSERVATION so 6/2 is 3 -> three is the length of two groups BUT I have 4 left over and if I ran them through the grouping algorithm since it's even, even -> 4/2 is 2 -> two is the number of groups

		[1,1,2,2] => [1,1], [2,2]
		-> [1, 1], [2, 2]
		--> 2, 2
		---> even, even
		----> 2 evens (consecutive), length of array is 4
		-OBSERVATION so 4/2 is 2 -> two is the number of groups

		[1,1,1,1,2,2,2,2] => [1,1], [1,1], [2,2], [2,2]
		-> [1, 1, 1, 1], [2, 2, 2, 2]
		--> 4, 4
		---> even, even
		----> 2 evens (consecutive), length of array is 8
		-OBSERVATION so 8/2 is 4 -> four is the number of groups




	groups of 3 to 4:
		a1, b1, c2, d2 

		a1, b1

		c2, d2

	* 
		I want a group of 3, but if there's 1 left over then I want two groups of 2, but if there are 2 left over then I want a group of 3 and a group of 2 in the same tier or up by 1 





done
-----
- make it so it fills the table before moving to the next one
- make it not break if there is more seating than students
