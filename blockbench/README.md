# WANDERIA Asset Generator

Blockbench用のローカルプラグインです。15種類のボクセル部品を、選択して一つずつ生成できます。

## 入れ方

1. `wanderia_asset_generator.js` をMacへダウンロードします。
2. Blockbenchで **File > Plugins** を開きます。
3. 上部の **Load Plugin from File** を選び、このJSファイルを選択します。
4. Blockbenchを再起動するか、Plugin画面でReloadします。

## 使い方

1. Blockbenchで **Generic Model** の新規プロジェクトを開きます。
2. メニューバーの **Tools > WANDERIA Asset Generator** を選びます。
3. 15種類から部品とサイズを選んで **Confirm** を押します。
4. Outlinerに `WANDERIA • ...` グループとして生成されます。各キューブは自由に編集できます。
5. 仕上がったら **File > Export > glTF Binary (.glb)** で書き出します。

## 収録パーツ

草地、土、石の道、小さな池、小さな岩、大きな岩、茂み、花、丸い木、針葉樹、小さな家、中くらいの家、塔、小さな橋、街灯。

## 注意

これは形を高速に作る最初のライブラリです。Blockbenchの表示色は編集の目印として使い、GLBへ確実に色を含めたい場合は、生成後にテクスチャまたはマテリアルを設定してから書き出してください。
