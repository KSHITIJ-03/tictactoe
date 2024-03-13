const express = require("express")

const app = express()

app.use(express.static("public"))

app.listen(3000, () => {
    console.log("server started at port 3000");
})

const x = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const o = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const XO = async (req, res, next) => {
    try {
        const user = req.params.user
        const a = req.params.x
        const b = req.params.y

        console.log(a);
        console.log(b);

        if(user === 'X')
        {
            console.log("for X");
            x[a][b] = 1
            //console.log(x);
            for(let i = 0; i < 3; i++) {
                if(x[i][0] === 1 && x[i][1] === 1 && x[i][2] === 1)
                {
                    const obj = {winner : "player1"}
                    req.winner = obj
                    return next()
                }
            }

            for(let j = 0; j < 3; j++) {
                if(x[0][j] === 1 && x[1][j] === 1 && x[2][j] === 1)
                {
                    const obj = {winner : "player1"}
                    req.winner = obj
                    return next()
                }
            }

            if(x[0][0] === 1 && x[1][1] === 1 && x[2][2] === 1)
            {
                const obj = {winner : "player1"}
                req.winner = obj
                return next()
            }

            if(x[2][0] === 1 && x[1][1] === 1 && x[2][0] === 1)
            {
                const obj = {winner : "player1"}
                req.winner = obj
                return next()
            }
        }
        else
        {
            console.log("for 0");
            o[a][b] = 1
            //console.log(o);
            for(let i = 0; i < 3; i++) {
                if(o[i][0] === 1 && o[i][1] === 1 && o[i][2] === 1)
                {
                    const obj = {winner : "player2"}
                    req.winner = obj
                    return next()
                }
            }

            for(let j = 0; j < 3; j++) {
                if(o[0][j] === 1 && o[1][j] === 1 && o[2][j] === 1)
                {
                    const obj = {winner : "player2"}
                    req.winner = obj
                    return next()
                }
            }

            if(o[0][0] === 1 && o[1][1] === 1 && o[2][2] === 1)
            {
                const obj = {winner : "player2"}
                req.winner = obj
                return next()
            }

            if(o[2][0] === 1 && o[1][1] === 1 && o[2][0] === 1)
            {
                const obj = {winner : "player2"}
                req.winner = obj
                return next()
            }
        }
        console.log(x);
        console.log(o);
        return res.status(200).json({
            status : "success",
            message : "nice"
        })
    } catch(err) {
        res.status(500).json({
            status : "fail",
            message : "server internal error"
        })
    }
}

const winner = async(req, res, next) => {
    try {
        console.log(req.winner);
        const win = req.winner.winner
        return res.status(200).json({
            status : "endgame",
            message :  `${win} winner`
        })
    } catch(err) {
        res.status(500).json({
            status : "fail",
            message : "server internal error"
        })
    }
}

app.post("/api/:user/:x/:y", XO, winner)