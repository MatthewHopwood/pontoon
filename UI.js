function UI(x, y)
{
    this.x = x;
    this.y = y;
    this.visible = true;
    this.elements = [];
    this.update = function()
    {
        if (!this.visible)
        {
            return;
        }
        this.ax = this.x;
        this.ay = this.y;

        for(var t = 0; t < this.elements.length; t++)
        {
            this.elements[t].update();
        }
    }
    this.draw = function()
    {
        if (!this.visible)
        {
            return;
        }

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
