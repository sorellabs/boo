:: b.one
========

Bone is a library that provides a minimal core functionality missing on
standard JavaScript. The modules include extensions to the prototypal
inheritance (including a basic trait system), and packaging utils.

> Note that the library is not ready for production use. It's alpha and
> under heavy development. Some features are missing, some are buggy.


Running tests
-------------

You'll need Node.js and [Claire][] to run the test cases. You should get
Claire automagically while cloning the repository. If you're using git
though, you'll have to clone it manually.

Please refer to the `.hgsub` file in the root directory for the path and
url for each dependency.


Documentation
-------------

Currently, there are no docs. Just refer to the source code, as they
explain the code in great detail (literate programming, etc)


Licence
-------

Bone is MIT/X11 licenced. Take a peek at the `LICENCE.txt` file for less
details.


Reporting issues/patches
------------------------

Just use the [Github][] repository for all of this. Please make sure
your patch/pull-request adhere to the library's conventions. Though they
are not documented, just remember:

-  Less noises. No semicolons or braces, unless strictly needed.

-  Braces shouldn't be on a line of their own, unless they close a
   function.
-  No strict comparison operator, unless strictly needed.

-  Form feed characters to separate pages of the code.

-  Heading comments with at least four slashes (for outline-mode)

-  Avoid comments inside the function unless strictly needed. Prefer
   naming confuse or big chunks of code with a function.
   
-  Concise and meaningful names. Use local variables to bind long names,
   always.
   
-  Tabs for indentation, spaces for alignment.
   
That's about it, you can figure the rest from the source code.


Last, but not least
-------------------

I suck at writing README files. But expect it to get better when I feel
more like writing it...


[Github]: https://github.com/killdream/Bone
[Claire]: https://github.com/killdream/Claire
