let mainSelectPanel = $("#HeroSelectPanel")
let selectedHeroList = $("#SelectedHeroList")

function createHeroBoxes() {
    heroes.forEach(function (heroName) {
        let heroSelectPanel = createPanel(mainSelectPanel)
        addClass(heroSelectPanel, 'HeroSelectPanel')

        let heroSceneAndSelectButton = createPanel(heroSelectPanel)
        addClass(heroSceneAndSelectButton, 'HeroSceneAndSelectButton')

        let defendersGroup = createPanel(heroSelectPanel)
        addClass(defendersGroup, 'DefendersGroup')

        let heroSceneId = "heroScene" + heroName
        heroSceneAndSelectButton.BCreateChildren("<DOTAScenePanel allowrotation='true' unit='" + heroName + "' id='" + heroSceneId + "' particleonly='false'/>");
        addClass($("#" + heroSceneId), 'HeroScene')

        let selectButton = createElement('Button', heroSceneAndSelectButton)
        addClass(selectButton, 'DefaultButton')
        addClass(selectButton, 'SelectButton')

        setPanelEvent(selectButton, 'onactivate', function () {
            sendEventToServer("hero_selected", {HeroName: heroName})
        })

        let label = createElement('Label', selectButton);
        addClass(label, 'SelectButtonLabel')
        label.text = 'Select Leader';

        defenders.get(heroName).forEach(function (defenderName) {
            let defenderPanel = createPanel(defendersGroup)
            addClass(defenderPanel, 'Defender')

            let imagePanel = createElement("DOTAHeroImage", defenderPanel)

            imagePanel.heroimagestyle = "landscape";
            imagePanel.heroname = defenderName
            imagePanel.hittest = false;
        })
    })
}

function createSelectedHeroBoxes() {
    let mainSelectedHeroPanel = createPanel(selectedHeroList)
    addClass(mainSelectedHeroPanel, 'MainSelectedHeroPanel')

    for (let i = 0; i < 4; i++) {
        createPlayerBox(mainSelectedHeroPanel, i)
    }

    createTimer(mainSelectedHeroPanel)

    for (let i = 4; i < 8; i++) {
        createPlayerBox(mainSelectedHeroPanel, i)
    }
}

function createPlayerBox(mainSelectedHeroPanel, playerNumber) {
    let player = Game.GetPlayerInfo(playerNumber)

    let playerBox = createPanel(mainSelectedHeroPanel, 'playerBox_' + playerNumber)
    addClass(playerBox, 'PlayerPanel')

    let heroPanel = createPanel(playerBox, 'heroPanel_' + playerNumber)
    addClass(heroPanel, 'SelectedHeroPanel')

    let playerNamePanel = createPanel(playerBox, 'playerNamePanel_' + playerNumber)
    addClass(playerNamePanel, 'PlayerNamePanel')

    if (player !== undefined) {
        let label = createElement('Label', playerNamePanel);
        addClass(label, 'PlayerNameLabel')
        label.text = player.player_name;
    }
}

function createTimer(mainSelectedHeroPanel) {
    let timerBox = createPanel(mainSelectedHeroPanel, 'hero_select_timer')
    addClass(timerBox, 'TimePanel')

    let label = createElement('Label', timerBox, 'hero_select_timer_label');
    addClass(label, 'TimerLabel')
    label.text = 30;
}

function OnPickingDone(data) {
    let mainPanel = $("#CustomSelectAndPlayerPanel").GetParent();
    mainPanel.RemoveAndDeleteChildren()
    mainPanel.DeleteAsync(0)
}

function OnTimeUpdate(data) {
    $("#hero_select_timer_label").text = data.time
}

function OnPlayerPicked(data) {
    let heroImageID = 'heroImage_' + data.playerID
    let heroImage = $("#" + heroImageID)
    let heroPanel = $("#heroPanel_" + data.playerID)
    if (heroImage !== null) {
        heroPanel.RemoveAndDeleteChildren()
    }

    heroImage = createElement("DOTAHeroImage", heroPanel, 'heroImage_' + data.playerID)
    heroImage.heroimagestyle = "landscape";
    heroImage.heroname = data.heroName
}

(function () {
    GameEvents.Subscribe("hero_selection_done", OnPickingDone);
    GameEvents.Subscribe("hero_selection_time_update", OnTimeUpdate);
    GameEvents.Subscribe("player_selected_hero", OnPlayerPicked);

    createHeroBoxes()
    createSelectedHeroBoxes()
})();
