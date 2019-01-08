<!DOCTYPE HTML>
<html lang="en-US">
<head>
<title>step page</title>
<link href="../cl/course.css" type="text/css" rel="stylesheet" />
</head>
<body>

<?php
$cirsim = $view->find_aux('\CL\Cirsim\CirsimViewAux');
if($cirsim !== null) {
	$configurator = new \CL\Cirsim\Tasks\HexConfigurator();
	$configurator->configure($view->step, $cirsim, $user);
}
?>

<p>Your task is to create a circuit for a digit recognizer in Cirsim. For this assignment, your
  hexadecimal value is:</p>

<p class="shoutout"><?php echo $configurator->hex; ?></p>

<p>You will design combinational circuits
  which recognize these digits and map them to the appropriate segments in a seven-segment display.
A seven-segment display uses seven LEDs to represent hexadecimal digits. Here's the Cirsim seven-segment display:</p>
<div class="left">
<?php
$cirsim = $view->find_aux('\CL\Cirsim\CirsimViewAux');
if($cirsim !== null) {
	$cirsim->reset();
	$json = '{"grid":8,"snap":true,"circuits":[{"name":"main","width":400,"height":320,"components":[{"id":"c1001","x":272,"y":168,"name":"L1","type":"7seg","color":"green"},{"id":"c1002","x":112,"y":48,"name":null,"type":"Button"},{"id":"c1003","x":168,"y":304,"name":"E","type":"InPin","value":true},{"id":"c1004","x":48,"y":88,"name":null,"type":"Button"},{"id":"c1005","x":112,"y":120,"name":null,"type":"Button"},{"id":"c1006","x":48,"y":152,"name":null,"type":"Button"},{"id":"c1007","x":112,"y":184,"name":"B1","type":"Button"},{"id":"c1008","x":48,"y":216,"name":null,"type":"Button"},{"id":"c1009","x":112,"y":248,"name":null,"type":"Button"}],"connections":[{"from":"c1002","out":0,"to":"c1001","in":0,"bends":[{"x":200,"y":48},{"x":200,"y":104}]},{"from":"c1003","out":0,"to":"c1001","in":7,"bends":[]},{"from":"c1004","out":0,"to":"c1001","in":1,"bends":[{"x":184,"y":88},{"x":184,"y":120}]},{"from":"c1005","out":0,"to":"c1001","in":2,"bends":[{"x":160,"y":136}]},{"from":"c1006","out":0,"to":"c1001","in":3,"bends":[]},{"from":"c1007","out":0,"to":"c1001","in":4,"bends":[{"x":160,"y":168}]},{"from":"c1008","out":0,"to":"c1001","in":5,"bends":[{"x":184,"y":216},{"x":184,"y":184}]},{"from":"c1009","out":0,"to":"c1001","in":6,"bends":[{"x":200,"y":248},{"x":200,"y":200}]}]}]}';
	echo $cirsim->present_demo($json);
} else {
	echo '<p class="centerbox comp center">Cirsim not available in single page view</p>';
}
?>
<p>The buttons will do nothing until you enable the display. That is what the &quot;en&quot; input does. Click on the input E to enable it. Then press buttons to see what the different inputs do. </p>
<p>  As an example of how this can be used, the hexadecimal digit '9' can be displayed by lighting all of the segments except segment e. Similarly, 
the hexadecimal digit 'A' can be displayed by lighting all of the segments except segment d.</p>
<p>  Your circuits will accept four inputs A, B, C, D that represent the four bits in a hexadecimal digit, where A is the most significant bit. For each of the digits in <?php echo $configurator->hex; ?>, the hexadecimal code should light the display to make the particular character and the en input should be set true. For digits that are NOT in <?php echo $configurator->hex; ?>, the en input should be set false. The en input enables the display. The display is enabled ONLY for digits in <?php echo $configurator->hex; ?>. For example, suppose your value was A13F29. Your code should display the hexadecimal digits 1, 2, 3, F, A, and 9. If the digits 0, 4-8, or B-E are input, the display should be disabled (en set false). Note that the order of the digits does not matter.</p>
<aside class="seconda">I have arranged that everyone has an A in their hexadecimal value.</aside>
<p class="centerbox primary">This is a very simple idea. Suppose there is an A in your hexadecimal value. An A in hex is 1010 in binary. That would be A and C true and B and D false. Looking at the table below, we see that an A should light segments a, b, c, e, f, and g of the display. You will have eight circuits. Each circuit will have four inputs A-D and one output. When the input is 1010, the output of circuits a, b, c, e, f, and g will be a one. The output of circuit d will be a zero, since for an A that segment is not displayed. The en circuit output will be a one, since A <em>is</em> part of <?php echo $configurator->hex; ?>.</p>
<aside class="secondb">There are two ways to solve this problem: a) using don't cares or b) not using
don't cares. One of these options will require massively less work! Choose wisely.</aside>
<p>This is a circuit that will display the digits in <?php echo $configurator->hex; ?> and only 
those digits. Note that for digits that are not accepted, the display inputs a-g are ignored. That should tell you something about your design.</p>
<p>This table shows the segments to enable for each hexadecimal digit:</p>
<div>
<table>
  <tbody>
    <tr>
      <th scope="col">Digit</th>
      <th scope="col">Segments</th>
    </tr>
    <tr>
      <td>0</td>
      <td>a,b,c,d,e,f</td>
    </tr>
    <tr>
      <td>1</td>
      <td>b,c</td>
    </tr>
    <tr>
      <td>2</td>
      <td>a, b, d, e, g</td>
    </tr>
    <tr>
      <td>3</td>
      <td>a, b, c, d, g</td>
    </tr>
    <tr>
      <td>4</td>
      <td>b, c, f, g</td>
    </tr>
    <tr>
      <td>5</td>
      <td>a, c, d, f, g</td>
    </tr>
    <tr>
      <td>6</td>
      <td>a, c, d, e, f, g</td>
    </tr>
    <tr>
      <td>7</td>
      <td>a, b, c</td>
    </tr>
    <tr>
      <td>8</td>
      <td>a, b, c, d, e, f, g</td>
    </tr>
    <tr>
      <td>9</td>
      <td>a, b, c, d, f, g</td>
    </tr>
    <tr>
      <td>A</td>
      <td>a, b, c, e, f, g</td>
    </tr>
    <tr>
      <td>B</td>
      <td>c, d, e, f, g</td>
    </tr>
    <tr>
      <td>C</td>
      <td>a, d, e, f</td>
    </tr>
    <tr>
      <td>D</td>
      <td>b, c, d, e, g</td>
    </tr>
    <tr>
      <td>E</td>
      <td>a, d, e, f, g</td>
    </tr>
    <tr>
      <td>F</td>
      <td>a, e, f, g</td>
    </tr>
  </tbody>
</table>
</div>
<h3>Tests</h3>
<p>So you can know that your circuit is working, there are three provided tests: Test-All, Test-a, and Test-en. Test-All tests all segments and en. If you pass that test your circuit is completely working. Test-a tests only the a segment and Test-en tests only the en inputs. They are provided so you can get part of your circuit working first.</p>
<p>Notice: Test-a does NOT test the circuit in the a tab. It tests the circuit in main, providing inputs to that circuit and testing the a input on the seven-segment display. If you do not have the display hooked up, the test will fail! The same applies for Test-en. This is the minimum circuit in main that will pass that test:</p>
<figure class="noshadow"><img src="minimum-a.png" alt="Miniumum circuit in tab main" width="482" height="180"></figure>
<h3>Tabs</h3>
<p>This circuit will rapidly get too large to fix on a single Cirsim screen (I know, I tried). So you will be using a Cirsim feature called Modules. I have included a 
<?php echo $view->link("page with details on how to use the modules feature in this assignment", "tabs.php"); ?>
. </p>
<h3>Additional Requirement</h3>
<p>You are required to complete Karnaugh Maps for the eight different outputs your circuit will send to the display. You are required to complete those on paper. When you turn them in, include your expression under the map on the page. </p>
<p>Note that you must hand in these two things:</p>
<ul>
  <li>8 Karnaugh maps for the 8 display inputs</li>
  <li>8 Expressions derived from the Karnaugh maps</li>
</ul>
<p class="rightbox primary">Why paper, you ask? On the exams you will have to complete Karnaugh maps on paper. I have found that students who have never done any by hand are more likely to have problems on the exam. Having one assignment where you must do the maps on paper tends to aleviate that issue.</p>
<p>You may turn in your paper Karnaugh maps either by providing to a TA during lab hours or to the instructor during office hours or you may slip it under the instructor's door at any time. You must turn in your Karnaugh maps within 24 hours of the closing of the assignment. If you are remotely located, you may either scan or take a legible picture of your Karnaugh maps and email to a TA or the instructor.</p>
<p class="centerbox comp">There will naturally be a temptation to wait and do the Karnaugh maps after you complete the Cirsim circuit. This is a very bad idea. You will need to do the maps to create an optimized circuit design. If you try to figure out a solution with the maps you'll create a lot of excess circuitry. If your circuit does not match your maps, the maps will not get credit, since they were not utilized.</p>
<p>Be sure you save your solution prior to the closing time for the assignment. Your solution is automatically saved whenever you press Test.</p>
<h3>Hints and Suggestions</h3>
<p>Try to stay neat. Avoid a lot of lines over components or diagonal lines. </p>
<p>The green bar at the bottom of the Cirsim window can be grabbed and dragged to increase the window size. This is useful for the larger main drawing.</p>
<p>Do one segment at a time and get it working. Don't try to create this whole thing and get it all working to the test. </p>
<p>If you are good at using your Karnaugh maps, you can make the circuit smaller. When I was doing maps for this assignment, I found the four-corner cover to be exceedingly popular for some reason.</p>
<p>No, there is not a five-input OR gate. But, you don't need it anyway.</p>
<p>Don't cares are a wonderful thing. If you use them effectively, your design will be smaller and easier to implement!</p>
<?php echo Toggle::begin("I get 'The test is not able to pass because you do not have a component named L1.'", "p"); ?>

<p>The test is looking for your seven-segment display. The default name for that component is L1. If you create more than one display or rename it, it may not find it. Just double-click on it and change the name back to L1.</p>

<?php echo Toggle::end(); ?>
<?php echo Toggle::begin("I dragged in the component a, but it has no inputs or outputs?", "p"); ?>

<p>You have to create inputs and outputs for the component in the a tab. Go to the tab and create four inputs A-D and one output O1. When you return to the main tab, the inputs and outputs will appear.</p>

<?php echo Toggle::end(); ?>

<?php echo Toggle::begin("One of my Karnaugh maps is completely covered (a 16-cover). What does that mean?", "p"); ?>

<p>It is not uncommon that one or more of the Karnaugh maps in this assignment will end up with a 1 or don't care in every single location. In such a case, you can cover the entire map with a single 16-cover. A 16-cover means that all possible inputs produce a 1 output. That's easily implemented by simply using the constant 1 value in Cirsim.</p>
<figure class="center noshadow"><img src="cirsim1.png" alt="Cirsim 1 value" width="302" height="141"/></figure>

<p>The inputs are ignored in this case since it does not matter what their values are. This is a case where don't-cares are an absolutely wonderful thing!</p>

<?php echo Toggle::end(); ?>

<?php
if($cirsim !== null) {
	// Have to do the configuration again, since it was
	// reset when the demo circuit was displayed.
	$configurator = new \CL\Cirsim\Tasks\HexConfigurator();
	$configurator->configure($view->step, $cirsim, $user);
	echo $cirsim->present();
} else {
	echo '<p class="centerbox comp center">Cirsim not available in single page view</p>';
}
?>

</body>