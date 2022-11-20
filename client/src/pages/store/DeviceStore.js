import {makeAutoObservable} from 'mobx'

export default class DeviceStore {

    constructor(){
        this._brands = [];
        this._types = [];
        this._devices = [];
        this._activeType = {};
        this._activeBrand = {};
        this._page = 1;
        this._limit = 3;
        this._totalCount = 0;
        this._ratings = 0;
        this._deviceId = null;
        
        makeAutoObservable(this);
    }

    setBrand(brands){
        this._brands = brands;
    }
    setType(types){
        this._types = types;
    }
    setDevice(devices){
        this._devices = devices;
    }
    setActiveType(type){
        this.setPages(1)
        this._activeType = type;
    }
    setActiveBrand(brand){
        this.setPages(1)
        this._activeBrand = brand;
    }
    setPages(page){
        this._page = page;
    }
    setLimit(limit){
        this._limit = limit;
    }
    setCount(count){
        this._totalCount = count;
    }
    setRating(rating){
        this._ratings = rating
    }
    setDeviceId(id){
        this._deviceId = id;
    }


    get brands(){
        return  this._brands
    }
    get types(){
        return  this._types
    }
    get devices(){
        return  this._devices
    }
    get activeType(){
        return this._activeType
    }
    get activeBrand(){
        return this._activeBrand
    }
    get page (){
        return this._page
    }
    get totalCount (){
        return this._totalCount
    }
    get limit (){
        return this._limit
    }
    get ratings(){
        return this._ratings
    }
    get id(){
        return this._deviceId
    }

}