import { LightningElement, api } from 'lwc';

const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';


// imports
export default class BoatTile extends LightningElement {
    @api boat;
    @api selectedBoatId;

    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() {
        const pictureUrl = this.boat && this.boat.Picture__c ? this.boat.Picture__c : '';
        return pictureUrl ? `background-image: url('${pictureUrl}')` : '';
    }
    
    // Getter for dynamically setting the tile class based on whether the
    // current boat is selected
    get tileClass() {
        const isSelected = this.selectedBoatId === (this.boat && this.boat.Id);
        return isSelected
            ? BoatTile.TILE_WRAPPER_SELECTED_CLASS
            : BoatTile.TILE_WRAPPER_UNSELECTED_CLASS;
    }
    
    // Fires event with the Id of the boat that has been selected.
    selectBoat() {
        const boatId = this.boat && this.boat.Id ? this.boat.Id : null;
        const boatSelect = new CustomEvent('boatselect', {
            detail: { boatId }
        });
        this.dispatchEvent(boatSelect);
    }
  }
  