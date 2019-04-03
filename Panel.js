function Panel(name, x, y, width, height, colour)
{
    this.type = 'panel';
    this.name = name;
    this.parent = undefined;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.elements = [];
    this.visible = true;
    this.update = function()
    {
        if (!this.visible)
        {
            return
        }
        this.ax = this.x + this.parent.ax;
        this.ay = this.y + this.parent.ay;

        for(var t = 0; t < this.elements.length; t++)
        {
            this.elements[t].update();
        }
    }
    this.draw = function()
    {
        if (!this.visible)
        {
            return
        }
        var x = this.ax - this.width / 2;
        var y = this.ay - this.height / 2;
        ctx.fillStyle = this.colour;
        ctx.fillRect(x, y, this.width, this.height);

        for(var t = 0; t < this.elements.length; t++)
        {
            this.elements[t].draw();
        }
    }
    this.clicked = function(x, y)
    {
        if (!this.visible)
        {
            return false;
        }

        for(var t = 0; t < this.elements.length; t++)
        {
            if(this.elements[t].clicked(x, y))
            {
                return true;
            }
        } 
        return false;
    }
    this.addElement = function(element)
    {
        this.elements.push(element);
        element.parent = this;
    }
}
