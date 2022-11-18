(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{410:function(n,_,v){"use strict";v.r(_);var t=v(23),component=Object(t.a)({},(function(){this._self._c;return this._m(0)}),[function(){var n=this,_=n._self._c;return _("div",[_("p",[n._v("\n    ルービッククロックをフリップ（反転）なしで解く方法の日本語解説です。 元ネタは"),_("a",{attrs:{href:"https://www.speedsolving.com/threads/no-flip-clock-method-with-less-calculations.86326/"}},[n._v("No flip clock method with less calculations")]),n._v("\n    です。 この方法では、覚える数字は5つ、うち計算が必要な数字は1つだけです。\n  ")]),n._v(" "),_("h2",[n._v("1. エッジ記憶")]),n._v(" "),_("p",[n._v("\n    D,R,U,Lのエッジをセンターに合わせるにはいくらダイヤルを回せば良いかを覚えます。覚える順番が重要で、DRULの順に覚えます。\n    例えば、Dエッジが5時、センターが3時を指している場合、覚える数字はマイナス2です。\n    これを4回繰り返すことで、4つの覚えるべき数字かできます。\n  ")]),n._v(" "),_("h2",[n._v("2. AUFトレース")]),n._v(" "),_("p",[n._v("\n    AUFは計算で求めることもできますが（センターの初期値と記憶したエッジの逆値の和）、計算が苦手な場合はセンターの針を指でなぞることで算出可能です。\n    まずセンターの針の場所を指さします。記憶したエッジの数字に従って、その数字の逆値（プラスマイナスが逆の値）分だけ指を動かしていきます。\n    例えば、最初のセンター位置を3、記憶した数字を-2,0,5,-1とします。\n    最初はセンターの3を指します。そこに2を足して、5になります。次は0なので、5から動きません。\n    次は5を引くので、反時計回りに5動かし、0になります。\n    最後に、時計回りに1回して、最終的に1になります。この数字がAUFとなり、最後に覚える数字です。\n  ")]),n._v(" "),_("h2",[n._v("3. 反転")]),n._v(" "),_("p",[n._v("解き始めるための反転は、必ずx2（縦回し）にします。")]),n._v(" "),_("h2",[n._v("4. 解き方")]),n._v(" "),_("p",[n._v("\n    Uピン2つがup、Dピン2つがdownで開始します。下のダイヤルで、記憶した最初の数字を回します。\n    上のダイヤルで、センターとDエッジを合わせます。この2つのダイヤルは、同時に回すことができます。\n  ")]),n._v(" "),_("p",[n._v("\n    次に、Rピン2つをup、Lピン2つをdownにします。左のダイヤルで、2つ目の数字を回します。右のダイヤルで、センターとLエッジを合わせます。\n  ")]),n._v(" "),_("p",[n._v("\n    Dピンをup、Uピンをdownにします。上のダイヤルで3つ目の数字を回し、下のダイヤルでセンターとUエッジを合わせます。\n  ")]),n._v(" "),_("p",[n._v("\n    Lピンをup、Rピンをdownにします。右のダイヤルで4つ目の数字を回し、左のダイヤルでセンターとRエッジを合わせます。\n  ")]),n._v(" "),_("p",[n._v("\n    最後に、すべてのピンをdownにして、ダイヤルはどこでも良いので、AUFの数字を回します。\n    AUFは各エッジが終わる前に実行することも可能なので、スクランブルのピン位置によっては最初にするほうがいいかもしれません。\n    ただし、2回やらないように注意してください。\n  ")]),n._v(" "),_("p",[n._v("\n    これで、背面のエッジとセンターがすべて12時を向き、前面のセンターとエッジ向きがすべて揃っている状態になります。前面は12時になっている必要はありません。\n    コーナーは、好きなように解いてください。\n  ")]),n._v(" "),_("h2",[n._v("ヒント")]),n._v(" "),_("ul",[_("li",[n._v("\n      エッジとセンターのはじめから針があっているところがあれば、そちら側を記憶する面にしたほうが、記憶やトレースをする数が減るので楽かもしれません。\n    ")]),n._v(" "),_("li",[n._v("\n      記憶のした数字のなかに逆値の数字（例えば-3と3）がある場合、AUFをトレースする際にはそれらは相殺されるので無視することができます。\n    ")])])])}],!1,null,null,null);_.default=component.exports}}]);