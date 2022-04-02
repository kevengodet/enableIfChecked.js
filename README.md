# jQuery plugin `enableIfChecked.js`

Change state of an input depending on which checkboxes are checked


## Example

On a checkout page, disable the "Get shipped" if all of checked items are not shippable.

```html
<input type=checkbox class=item id=item1 data-shippable=true><label for=item1>Item 1</label>
<input type=checkbox class=item id=item2 data-shippable=true><label for=item2>Item 1</label>
<input type=checkbox class=item id=item3 data-shippable=true><label for=item3>Item 1</label>

<input type=submit name=ship value=Ship />

<script type=application/javascript>
$('[name=ship]').enableIf({
  selector: '.item',          // Apply on all checkboxes which have .item class
  property: 'data-shippable', // Check if data-shippable attribute...
  value: 'true',              // ...is "true"
  action: 'select'            // If not, disable the "Ship" button
});
</script>  
```
