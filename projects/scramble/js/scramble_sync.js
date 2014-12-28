function generate_random_sequence(k){
    var sequence = [];
    for(var i=0; i<k; i++){
        if(Math.random() > 0.5)
            sequence.push(1);
        else
            sequence.push(0);
    }
    return sequence;
}

/*
 Double scrambling = descrambling!
 */
function scramble(Ak, reg2, reg6, reg9){
    return (Ak+reg2+reg6+reg9)%2; // Ax XOR (reg2 XOR reg6 XOR reg11)
}

document.getElementById("generate").onclick = function() {
    var k = +document.getElementById("k").value;
    document.getElementById("sequence").value = generate_random_sequence(k).join("");
};


document.getElementById("button").onclick = function() {
    var str_sequence = document.getElementById("sequence").value;
    var k = +document.getElementById("k").value;
    var sequence = [];
    var sdwig_register1 = generate_random_sequence(k);
    var sdwig_register2 = sdwig_register1.slice(0); // copy


    for(var i=0; i<str_sequence.length; i++){
        sequence.push(parseInt(str_sequence.charAt(i))); // fill up sequence
    }

    var B = []; // Array of scrambled values

    for(var i=0; i<sequence.length; i++){
        var res = scramble(sequence[i], sdwig_register1[2], sdwig_register1[6], sdwig_register1[9]);
        sdwig_register1.unshift(res); // add scrambled value to the first place in our register
        sdwig_register1.pop(); // remove last element from register, because we don't need it anymore
        B.push(res); // save result in B
    }

    document.getElementById("scrambled").innerHTML = "Scrambled sequence: [" + B.join(" ") + "]";

    var A = [];

    for(var i=0; i<B.length; i++){
        var res = scramble(B[i], sdwig_register2[2], sdwig_register2[6], sdwig_register2[9]);
        sdwig_register2.unshift(B[i]); // add Bi element to the first place in our register
        sdwig_register2.pop(); // remove last element from register, because we don't need it anymore
        A.push(res);
    }

    document.getElementById("descrambled").innerHTML = "Descrambled sequence: [" + A.join(" ") + "]";
};