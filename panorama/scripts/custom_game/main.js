let heroes = ['npc_dota_hero_naga_siren', 'npc_dota_hero_doom_bringer', 'npc_dota_hero_dragon_knight', 'npc_dota_hero_drow_ranger', 'npc_dota_hero_oracle']
let nagaDefenders = ['npc_dota_hero_naga_siren', 'npc_dota_hero_naga_siren', 'npc_dota_hero_naga_siren', 'npc_dota_hero_naga_siren', 'npc_dota_hero_naga_siren', 'npc_dota_hero_naga_siren']
let doomDefenders = ['npc_dota_hero_doom_bringer', 'npc_dota_hero_doom_bringer', 'npc_dota_hero_doom_bringer', 'npc_dota_hero_doom_bringer', 'npc_dota_hero_doom_bringer', 'npc_dota_hero_doom_bringer']
let dkDefenders = ['npc_dota_hero_dragon_knight', 'npc_dota_hero_dragon_knight', 'npc_dota_hero_dragon_knight', 'npc_dota_hero_dragon_knight', 'npc_dota_hero_dragon_knight', 'npc_dota_hero_dragon_knight']
let drowDefenders = ['npc_dota_hero_drow_ranger', 'npc_dota_hero_drow_ranger', 'npc_dota_hero_drow_ranger', 'npc_dota_hero_drow_ranger', 'npc_dota_hero_drow_ranger', 'npc_dota_hero_drow_ranger']
let oracleDefenders = ['npc_dota_hero_oracle', 'npc_dota_hero_oracle', 'npc_dota_hero_oracle', 'npc_dota_hero_oracle', 'npc_dota_hero_oracle', 'npc_dota_hero_oracle']


let defenders = new Map().set(heroes[0], nagaDefenders).set(heroes[1], doomDefenders).set(heroes[2], dkDefenders).set(heroes[3], drowDefenders).set(heroes[4], oracleDefenders)

function printMessage(message) {
    $.Msg(message)
}

function createPanel(parentPanel, id) {
    if (id == null) {
        return $.CreatePanel('Panel', parentPanel, '');
    } else {
        return $.CreatePanel('Panel', parentPanel, id);
    }
}

function createElement(element, parentPanel, id) {
    if (id == null) {
        return $.CreatePanel(element, parentPanel, '');
    } else {
        return $.CreatePanel(element, parentPanel, id);
    }
}

function addClass(element, className){
    element.AddClass(className)
    return element
}

function setPanelEvent(panel, event, func){
    panel.SetPanelEvent(event, (function () {return func;})());
}

function sendEventToServer(eventName, data){
    GameEvents.SendCustomGameEventToServer(eventName, data);
}