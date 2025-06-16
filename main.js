function changeText(title, type) {

    if (type == 'bo') {
        if(document.getElementById('Kesari').classList.contains('clicked')) {
            document.getElementById('Kesari').classList.remove('clicked');
        } else if (document.getElementById('SkyForce').classList.contains('clicked')) {
            document.getElementById('SkyForce').classList.remove('clicked');
        } else if (document.getElementById('Sikandar').classList.contains('clicked')) {
            document.getElementById('Sikandar').classList.remove('clicked');
        } else if (document.getElementById('Raid2').classList.contains('clicked')) {
            document.getElementById('Raid2').classList.remove('clicked');
        } else if (document.getElementById('Chhaava').classList.contains('clicked')) {
            document.getElementById('Chhaava').classList.remove('clicked');
        }

        if (title == 'Kesari') {
        document.getElementById('Kesari').classList.add('clicked');
        document.getElementById('collection').innerHTML = '<h3 id="collection">Worldwide Collection: <span class="boldText">₹144.35cr</span></h3>';
        document.getElementById('boimg').src = "images/kesarich2.jpg";
        document.getElementById('director').innerHTML = '<p id="director"><span class="boldText">Director:</span> Karan Singh Tyagi</p>';
        document.getElementById('actors').innerHTML = '<p id="actors"><span class="boldText">Actors:</span> Akshay Kumar, R. Madhavan, Ananya Pandey</p>';
        } else if (title == 'SkyForce') {
            document.getElementById('SkyForce').classList.add('clicked');
            document.getElementById('collection').innerHTML = '<h3 id="collection">Worldwide Collection: <span class="boldText">₹168.88cr</span></h3>';
            document.getElementById('boimg').src = "images/skyforce.jpeg";
            document.getElementById('director').innerHTML = '<p id="director"><span class="boldText">Directors:</span> Sandeep Kewlani, Abhishek Anil Kapur</p>';
            document.getElementById('actors').innerHTML = '<p id="actors"><span class="boldText">Actors:</span> Akshay Kumar, Veer Pahariya, Sara Ali Khan</p>';
        } else if (title == 'Sikandar') {
            document.getElementById('Sikandar').classList.add('clicked');
            document.getElementById('collection').innerHTML = '<h3 id="collection">Worldwide Collection: <span class="boldText">₹176.18cr</span></h3>';
            document.getElementById('boimg').src = "images/sikandar.jpg";
            document.getElementById('director').innerHTML = '<p id="director"><span class="boldText">Director:</span> A.R. Murugadoss</p>';
            document.getElementById('actors').innerHTML = '<p id="actors"><span class="boldText">Actors:</span> Salman Khan, Rashmika Mandanna, Sathyaraj</p>';
        } else if (title == 'Raid2') {
            document.getElementById('Raid2').classList.add('clicked');
            document.getElementById('collection').innerHTML = '<h3 id="collection">Worldwide Collection: <span class="boldText">₹238.33cr</span></h3>';
            document.getElementById('boimg').src = "images/raid2.jpg";
            document.getElementById('director').innerHTML = '<p id="director"><span class="boldText">Director:</span> Raj Kumar Gupta</p>';
            document.getElementById('actors').innerHTML = '<p id="actors"><span class="boldText">Actors:</span> Ajay Devgn, Riteish Deshmukh, Vaani Kapoor</p>';
        } else if (title == 'Chhaava') {
            document.getElementById('Chhaava').classList.add('clicked');
            document.getElementById('collection').innerHTML = '<h3 id="collection">Worldwide Collection: <span class="boldText">₹797.34cr</span></h3>';
            document.getElementById('boimg').src = "images/chaava_poster2.jpg";
            document.getElementById('director').innerHTML = '<p id="director"><span class="boldText">Director:</span> Laxman Utekar</p>';
            document.getElementById('actors').innerHTML = '<p id="actors"><span class="boldText">Actors:</span> Vicky Kaushal, Akshaye Khanna, Rashmika Madanna</p>';
        } else {
            console.log ('Title Not In Selection');
        }
    }

    if (type == 'cc') {
        if(document.getElementById('Chhaava2').classList.contains('clicked')) {
            document.getElementById('Chhaava2').classList.remove('clicked');
        } else if (document.getElementById('DhoomDhaam').classList.contains('clicked')) {
            document.getElementById('DhoomDhaam').classList.remove('clicked');
        } else if (document.getElementById('Deva').classList.contains('clicked')) {
            document.getElementById('Deva').classList.remove('clicked');
        } else if (document.getElementById('Mehta').classList.contains('clicked')) {
            document.getElementById('Mehta').classList.remove('clicked');
        } else if (document.getElementById('Malegaon').classList.contains('clicked')) {
            document.getElementById('Malegaon').classList.remove('clicked');
        }

        if (title == 'Chhaava2') {
            document.getElementById('Chhaava2').classList.add('clicked');
            document.getElementById('quote').innerHTML = '<h3 class="italicText">"A thunderous tribute to a beloved hero"</h3>';
            document.getElementById('ccimg').src = "images/chaava_poster2.jpg";
            document.getElementById('ccdirector').innerHTML = '<p id="ccdirector"><span class="boldText">Director:</span> Laxman Utekar</p>';
            document.getElementById('ccactors').innerHTML = '<p id="ccactor"><span class="boldText">Actors:</span> Vicky Kaushal, Akshaye Khanna, Rashmika Madanna</p>';
        } else if (title == 'DhoomDhaam') {
            document.getElementById('DhoomDhaam').classList.add('clicked');
            document.getElementById('quote').innerHTML = '<h3 class="italicText">"An entertaining rom-com"</h3>';
            document.getElementById('ccimg').src = "images/dhoomdhaam.jpg";
            document.getElementById('ccdirector').innerHTML = '<p id="ccdirector"><span class="boldText">Director:</span> Rishabh Seth</p>';
            document.getElementById('ccactors').innerHTML = '<p id="ccactor"><span class="boldText">Actors:</span> Pratik Gandhi, Yami Gautam</p>';
        } else if (title == 'Deva') {
            document.getElementById('Deva').classList.add('clicked');
            document.getElementById('quote').innerHTML = '<h3 class="italicText">"Mumbai Police gets a fiery remake"</h3>';
            document.getElementById('ccimg').src = "images/deva.jpg";
            document.getElementById('ccdirector').innerHTML = '<p id="ccdirector"><span class="boldText">Director:</span> Rosshan Andrews</p>';
            document.getElementById('ccactors').innerHTML = '<p id="ccactor"><span class="boldText">Actors:</span> Shahid Kapoor, Pooja Hegde</p>';
        } else if (title == 'Mehta') {
            document.getElementById('Mehta').classList.add('clicked');
            document.getElementById('quote').innerHTML = '<h3 class="italicText">"A deep dive into the complexities of a father-son relationship"</h3>';
            document.getElementById('ccimg').src = "images/mehtaboys.jpg";
            document.getElementById('ccdirector').innerHTML = '<p id="ccdirector"><span class="boldText">Director:</span> Boman Irani</p>';
            document.getElementById('ccactors').innerHTML = '<p id="ccactor"><span class="boldText">Actors:</span> Boman Irani, Avinash Tiwary</p>';
        } else if (title == 'Malegaon') {
            document.getElementById('Malegaon').classList.add('clicked');
            document.getElementById('quote').innerHTML = '<h3 class="italicText">"A tribute to the cinephile"</h3>';
            document.getElementById('ccimg').src = "images/malegaon.jpg";
            document.getElementById('ccdirector').innerHTML = '<p id="ccdirector"><span class="boldText">Director:</span> Reema Kagti</p>';
            document.getElementById('ccactors').innerHTML = '<p id="ccactor"><span class="boldText">Actors:</span> Adarsh Gourav, Shashank Arora, Vineet Kumar Singh</p>';
        } else {
            console.log ('Title Not In Selection');
        }
    }
};