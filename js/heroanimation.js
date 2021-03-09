var bubbles = document.getElementsByClassName('bubble');

for (let index = 0; index < bubbles.length; index++) {

    // This handler will be executed every time the cursor is moved over a different list item
    bubbles[index].addEventListener("mouseenter", function (event) {
        var bubble = event.target

    
        // Variable for bubble coordinates
        var pos = bubble.getBoundingClientRect()

        // Creating a div element
        var divElement = document.createElement("Div");    // Tjek for validering
        divElement.id = "divID";
        bubble.insertAdjacentElement('beforebegin', divElement)

        // Div styling and placement
        document.getElementById('divID').classList.add('bubble2')
        document.getElementById('divID').style.backgroundColor  =  "white"
        document.getElementById('divID').style.left = pos.left + 'px'
        document.getElementById('divID').style.top = pos.top + 'px'
        document.getElementById('divID').style.height = pos.height + 'px'
        document.getElementById('divID').style.width = pos.width + 'px'
        document.getElementById('divID').style.position = 'absolute'
   
        document.getElementById("divID").classList.add('bubblepop')

        event.target.remove()

        // Delete the new div after a short delay after the pop animation is done
        setTimeout(function () {
            document.getElementById("divID").remove()
        }, 500);
    }, false);

}


