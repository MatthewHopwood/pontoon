function Label(name, text, x, y, colour, size)
{

    this.type = 'label';
    this.name = name;
    this.text = text;
    this.parent = undefined;
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.size = size;
    this.visible = true;
    this.update = function()
    {
        if (!this.visible)
        {
            return
        }
        this.ax = this.x + this.parent.ax;
        this.ay = this.y + this.parent.ay;
    }
    this.draw = function()
    {
        if (!this.visible)
        {
            return
        }
        var x = this.ax;
        var y = this.ay;
        ctx.font = '' + this.size + 'px Arial'; 
        ctx.fillStyle = this.colour;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, x, y)
    }
    this.clicked = function(x, y)
    {
        
    }
    this.setText = function(text)
    {
        this.text = text;
    }
}