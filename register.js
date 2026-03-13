const MODULE_ID = 'foundryvtt-root-magpie-es'

Hooks.on('init', () => {
  CONFIG.debug.hooks = true
  game.settings.register(MODULE_ID, 'autoRegisterBabel', {
    name: 'Automatically activate translation via Babele',
    hint: 'Automatically implements Babele translations without needing to point to the directory containing the translations.',
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
    onChange: value => {
      if (value) {
        autoRegisterBabel()
      }

      window.location.reload()
    },
  })

  if (game.settings.get(MODULE_ID, 'autoRegisterBabel')) {
    autoRegisterBabel()
  }
})

function autoRegisterBabel () {
  if (typeof Babele !== 'undefined') {
    const babele = game.babele
    babele.register({
      module: MODULE_ID,
      lang: 'es',
      dir: 'compendium/es',
    })
    babele.registerConverters({
      arrayConverter: (value, translation) => {
        debugger
        return value.map((original, index) => foundry.utils.mergeObject(original, translation[index], { inplace: false }))
      },
    })
  }
}
