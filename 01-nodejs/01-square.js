const input = process.argv[2]

if (input > 0 && input < 11) {
    let row = ''
        for (let i = 0; i < input; i++) {
            row += '#'
        }
        for (let j = 0; j < input; j++) {
            console.log(row)
        }
    }
    else {
        console.log('Please choose a number between 1-10!')
    }
