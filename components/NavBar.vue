<template>
  <nav class="navbar is-dark p-2" role="navigation" aria-label="main navigation">
    <div class="navbar-brand ml-1">
      <a class="navbar-item" href="/"> roudai.net </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarMenu"
        :class="nav_class"
        @click="menuShow"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarMenu" class="navbar-menu" :class="nav_class">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> F2L </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/f2l/f2l"> F2L手順 </a>
            <a class="navbar-item" href="/f2l/f2l-advanced"> 発展形F2L </a>
            <a class="navbar-item" href="/f2l/winter-variation"> Winter Variation </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> OLL </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/oll/oll-view"> OLL一覧 </a>
            <a class="navbar-item" href="/oll/oll"> OLL手順 </a>
            <a class="navbar-item" href="/oll/coll"> COLL </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> PLL </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/pll/pll-view"> PLL一覧 </a>
            <a class="navbar-item" href="/pll/pll-chances"> PLLの確率 </a>
            <a class="navbar-item" href="/pll/pll"> PLL手順 </a>
            <a class="navbar-item" href="/pll/two-sided-pll"> 2側面判断 </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> BLD </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/bld/bld-introduction"> ルービックキューブを目隠しで揃えるには </a>
            <a class="navbar-item" href="/bld/bld-method"> ルービックキューブ目隠しの解法 </a>
            <a class="navbar-item" href="/bld/old-pochmann-corner"> Old Pochmann method(corner) </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Megaminx </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/megaminx/megaminx-eo"> Megaminx EO </a>
            <a class="navbar-item" href="/megaminx/megaminx-co"> Megaminx CO </a>
            <a class="navbar-item" href="/megaminx/megaminx-ep"> Megaminx EP </a>
            <a class="navbar-item" href="/megaminx/megaminx-cp"> Megaminx CP </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> FMC </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/fmc/intro-fmc"> 最小手数競技の紹介 </a>
            <a class="navbar-item" href="/"> Domino Reduction </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Clock </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/clock/clock-no-flip"> No-Flip Method </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Other </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/other/3x3x3-method"> 各種解法 </a>
            <a class="navbar-item" href="/other/for-non-cubers"> 知っておいてほしいこと </a>
            <a class="navbar-item" href="/other/advent-calendar2014"> 続ける意味について </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Tooks </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="https://visualcube.roudai.net/"> VisualCube Editor </a>
            <a class="navbar-item" href="https://roudai.github.io/MegaminxImageEditor/"> Megaminx Image editor </a>
            <a class="navbar-item" href="https://roudai.github.io/PLLTrainer/"> PLL Trainer </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <a href="https://github.com/roudai/roudai.net">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="bi bi-github mr-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    nav_class: '',
  }),
  methods: {
    menuShow() {
      if (this.nav_class === '') {
        this.nav_class = 'is-active'
      } else {
        this.nav_class = ''
      }
    },
  },
}
</script>
