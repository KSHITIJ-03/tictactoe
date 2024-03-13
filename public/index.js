const cells = document.querySelectorAll('.cell');
let clicks = true;


const cellClickHandler = async (event) => {
    try {
        const cell = event.target
        if (clicks) {
            cell.textContent = 'X';
            clicks = false;
            const user = 'X';
            const index = cell.getAttribute('data-index');
            const x = cell.getAttribute('x');
            const y = cell.getAttribute('y');
            const res = await axios.post(`http://localhost:3000/api/${user}/${x}/${y}`);
            if(res.data.status === 'success') {
                console.log(index);
                cell.classList.add('occupied');
                cell.removeEventListener('click', cellClickHandler);
            }
    
        } else {
            cell.textContent = '0';
            clicks = true;
            const user = 'o';
            const index = cell.getAttribute('data-index');
            const x = cell.getAttribute('x');
            const y = cell.getAttribute('y');
            const res = await axios.post(`http://localhost:3000/api/${user}/${x}/${y}`)
            if(res.data.status === 'success') {
                console.log(index);
                cell.classList.add('occupied');
                cell.removeEventListener('click', cellClickHandler);
            }
        }
        
    }
    catch(err) {
        console.error("Error:", err);
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', cellClickHandler);
});
