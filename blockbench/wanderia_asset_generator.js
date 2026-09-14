/*
 * WANDERIA Asset Generator for Blockbench
 * Local-use plugin: generate one voxel asset at a time from reusable recipes.
 */
(function() {
  let action;

  const COLORS = {
    grass: 5, leaf: 7, wood: 2, stone: 0, road: 1,
    water: 3, flower: 6, roof: 4, light: 6, dirt: 4
  };

  const assets = {
    ground_grass: { label: '01  草地タイル', make: grassTile },
    ground_dirt: { label: '02  土地タイル', make: dirtTile },
    road_stone: { label: '03  石の道タイル', make: stoneRoad },
    water_pool: { label: '04  小さな池', make: waterPool },
    rock_small: { label: '05  小さな岩', make: smallRock },
    rock_large: { label: '06  大きな岩', make: largeRock },
    bush: { label: '07  茂み', make: bush },
    flower: { label: '08  花', make: flower },
    tree_round: { label: '09  木（丸型）', make: roundTree },
    tree_pine: { label: '10  木（針葉樹）', make: pineTree },
    house_small: { label: '11  小さな家', make: smallHouse },
    house_medium: { label: '12  中くらいの家', make: mediumHouse },
    tower: { label: '13  塔', make: tower },
    bridge: { label: '14  小さな橋', make: bridge },
    lamp: { label: '15  街灯', make: lamp }
  };

  function addBox(group, name, x, y, z, w, h, d, color, scale) {
    const from = [x * scale, y * scale, z * scale];
    const to = [(x + w) * scale, (y + h) * scale, (z + d) * scale];
    return new Cube({ name, from, to, color, shade: true }).init().addTo(group);
  }

  function createAsset(id, scale) {
    const asset = assets[id];
    if (!asset) return;
    Undo.initEdit({ outliner: true, elements: [] });
    const group = new Group({ name: `WANDERIA • ${asset.label}`, origin: [0, 0, 0] }).init().addTo('root');
    const box = (name, x, y, z, w, h, d, color) => addBox(group, name, x, y, z, w, h, d, color, scale);
    asset.make(box);
    Canvas.updateAll();
    Undo.finishEdit(`Generate ${asset.label}`);
    Blockbench.showQuickMessage(`${asset.label} を生成しました`);
  }

  // Every recipe is intentionally small and editable. Coordinates are voxel units.
  function grassTile(b) { b('grass', -4, 0, -4, 8, .45, 8, COLORS.grass); b('grass tuft', -2, .45, -1, .35, .7, .35, COLORS.leaf); b('grass tuft', 2, .45, 2, .35, .45, .35, COLORS.leaf); }
  function dirtTile(b) { b('dirt', -4, 0, -4, 8, .5, 8, COLORS.dirt); b('grass edge', -4, .5, -4, 8, .18, 1.1, COLORS.grass); }
  function stoneRoad(b) { b('road base', -4, 0, -4, 8, .3, 8, COLORS.road); [[-3,-3],[-1,-1],[1,1],[3,3]].forEach(([x,z], i) => b(`stone ${i+1}`, x, .3, z, 1.6, .12, 1.6, COLORS.stone)); }
  function waterPool(b) { b('grass base', -4, 0, -4, 8, .35, 8, COLORS.grass); b('water', -2.9, .35, -2.5, 5.8, .15, 5, COLORS.water); b('bank', -3.3, .35, -3.1, 6.6, .2, .55, COLORS.grass); }
  function smallRock(b) { b('rock base', -1.5, 0, -1.3, 3, 1.1, 2.6, COLORS.stone); b('rock top', -.9, 1.1, -.8, 1.8, .75, 1.6, COLORS.stone); }
  function largeRock(b) { b('rock base', -2.4, 0, -2, 4.8, 1.3, 4, COLORS.stone); b('rock mid', -1.8, 1.3, -1.45, 3.6, 1.1, 2.9, COLORS.stone); b('rock top', -1.05, 2.4, -.8, 2.1, .85, 1.6, COLORS.stone); }
  function bush(b) { b('bush base', -1.7, 0, -1.4, 3.4, 1.2, 2.8, COLORS.leaf); b('bush crown', -1.15, 1.2, -1, 2.3, .9, 2, COLORS.grass); }
  function flower(b) { b('stem', -.16, 0, -.16, .32, 1.25, .32, COLORS.leaf); b('leaf', -.75, .55, -.15, .65, .28, .35, COLORS.grass); b('petal 1', -.75, 1.15, -.2, .7, .45, .4, COLORS.flower); b('petal 2', .05, 1.15, -.2, .7, .45, .4, COLORS.flower); b('center', -.2, 1.28, -.35, .4, .35, .7, COLORS.light); }
  function roundTree(b) { b('trunk', -.45, 0, -.45, .9, 3.1, .9, COLORS.wood); b('leaves low', -2, 2.35, -2, 4, 1.6, 4, COLORS.leaf); b('leaves high', -1.35, 3.95, -1.35, 2.7, 1.35, 2.7, COLORS.grass); }
  function pineTree(b) { b('trunk', -.42, 0, -.42, .84, 4.5, .84, COLORS.wood); b('leaves low', -2.2, 2.2, -2.2, 4.4, 1.25, 4.4, COLORS.leaf); b('leaves mid', -1.65, 3.45, -1.65, 3.3, 1.2, 3.3, COLORS.leaf); b('leaves top', -1.05, 4.65, -1.05, 2.1, 1.25, 2.1, COLORS.grass); }
  function smallHouse(b) { b('walls', -2.4, 0, -2, 4.8, 2.8, 4, COLORS.road); b('roof low', -2.85, 2.8, -2.45, 5.7, .7, 4.9, COLORS.roof); b('roof high', -2.2, 3.5, -1.8, 4.4, .75, 3.6, COLORS.roof); b('door', -.45, 0, -2.05, .9, 1.5, .18, COLORS.wood); }
  function mediumHouse(b) { b('walls', -3.2, 0, -2.6, 6.4, 3.6, 5.2, COLORS.road); b('roof low', -3.7, 3.6, -3.1, 7.4, .8, 6.2, COLORS.roof); b('roof high', -2.85, 4.4, -2.25, 5.7, .9, 4.5, COLORS.roof); b('door', -.55, 0, -2.65, 1.1, 1.8, .2, COLORS.wood); b('window', 1.45, 1.45, -2.65, .75, .8, .2, COLORS.water); }
  function tower(b) { b('tower base', -1.55, 0, -1.55, 3.1, 5.8, 3.1, COLORS.stone); b('top ledge', -1.95, 5.8, -1.95, 3.9, .55, 3.9, COLORS.road); b('roof', -1.4, 6.35, -1.4, 2.8, 1.2, 2.8, COLORS.roof); b('window', -.45, 2.4, -1.62, .9, 1.1, .16, COLORS.water); }
  function bridge(b) { b('deck', -4.5, 1.1, -1.25, 9, .45, 2.5, COLORS.wood); [-4,-2,0,2,4].forEach((x, i) => { b(`post ${i+1}`, x, 0, -1, .38, 1.1, .38, COLORS.stone); b(`post back ${i+1}`, x, 0, .62, .38, 1.1, .38, COLORS.stone); }); }
  function lamp(b) { b('post', -.28, 0, -.28, .56, 3.5, .56, COLORS.stone); b('lamp housing', -.85, 3.4, -.85, 1.7, 1.3, 1.7, COLORS.road); b('light', -.55, 3.65, -.55, 1.1, .75, 1.1, COLORS.light); b('cap', -1, 4.7, -1, 2, .35, 2, COLORS.stone); }

  function openGenerator() {
    new Dialog('wanderia_asset_generator_dialog', {
      title: 'WANDERIA Asset Generator',
      form: {
        asset: { label: '生成するパーツ', type: 'select', options: Object.fromEntries(Object.entries(assets).map(([id, asset]) => [id, asset.label])), value: 'tree_round' },
        scale: { label: 'サイズ', type: 'select', options: { '1': '標準', '0.75': '小さめ', '1.25': '大きめ' }, value: '1' }
      },
      onConfirm(form) { createAsset(form.asset, Number(form.scale)); }
    }).show();
  }

  Plugin.register('wanderia_asset_generator', {
    title: 'WANDERIA Asset Generator',
    author: 'WANDERIA',
    description: 'Generate 15 editable voxel assets for WANDERIA.',
    icon: 'view_in_ar',
    version: '0.1.0',
    variant: 'both',
    min_version: '4.8.0',
    onload() {
      action = new Action('wanderia_asset_generator_action', {
        name: 'WANDERIA Asset Generator',
        description: 'Generate an editable WANDERIA voxel asset',
        icon: 'view_in_ar',
        click: openGenerator
      });
      MenuBar.menus.tools.addAction(action);
    },
    onunload() { action.delete(); }
  });
})();
