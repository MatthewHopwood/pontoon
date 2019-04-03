var Digits = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K'
]

function Card(name, x, y, width, height, AI)
{   
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.AI = AI;
    this.number = 0;
    this.shown = false;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        if (this.AI == false)
        {
            ctx.fillStyle = 'rgb(0, 150, 255)';
            ctx.fillRect(this.x, this.y, this.width, this.height);

            if (this.shown)
            {        
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillText(Digits[this.number], this.x + this.width / 2, this.y + this.height / 2);
            }
        }
        else
        {
            ctx.fillStyle = 'rgb(255, 0, 0)';
            ctx.fillRect(this.x, this.y, this.width, this.height);

            if (this.shown)
            {        
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillText(Digits[this.number], this.x + this.width / 2, this.y + this.height / 2);
            }
        }    
    
    }
    this.show = function()
    {
        this.shown = true;
    }
}