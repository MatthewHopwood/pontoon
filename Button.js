function Button(name, x, y, width, height, colour)
{

    this.type = 'button';
    this.name = name;
    this.parent = undefined;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.elements = [];
    this.onClick = undefined;
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
    this.clicked = function(x, y)
    {
        if (!this.visible)
        {
            return false;
        }
        if(this.onClick !=undefined)
        {
            // c = centered
            var cx = this.ax - this.width / 2;
            var cy = this.ay - this.height / 2;
            if(x > cx && x < cx + this.width && y > cy && y < cy + this.height)
            {
                this.onClick();
                return true;
            }
        }
        return false;
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
    this.addElement = function(element)
    {
        this.elements.push(element);
        element.parent = this;
    }
    this.addLabel = function(text, name, colour, size)
    {
        var label = new Label(name, text, 0, 0, colour, size);
        this.addElement(label);
        return label;
    }
}
