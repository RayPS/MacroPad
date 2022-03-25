<script setup lang="ts">
import tokens from '@/assets/tokens'
import syntax from '@/assets/syntax'
</script>

<template>
  <div class="doc">
    <div class="syntax">
      <h3>Syntax</h3>
      <div class="card shadow">
        <div class="example">
          <h5>Example</h5>
          <ul class="mono">
            <li v-for="e in syntax.example" :key="e" v-text="e" />
          </ul>
        </div>
        <div class="desc">
          <h5>Description</h5>
          <ul class="mono">
            <li v-for="d in syntax.description" :key="d" v-text="d" />
          </ul>
        </div>
      </div>
    </div>
    <div class="tokens">
      <h3>Tokens</h3>
      <div class="card shadow">
        <div v-for="group in tokens" :key="group.name" class="token-group">
          <h5>{{ group.name }}</h5>
          <div class="token-items">
            <div v-for="item in group.items" :key="item" class="token-item mono">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="repo-link">
    <a target="_blank" href="https://github.com/RayPS/MacroPad">https://github.com/RayPS/MacroPad</a>
  </div>
</template>

<style lang="scss" scoped>
.doc {
  padding: 40px;
  display: flex;
  justify-content: space-between;
}

.tokens, .syntax {
  width: calc(50% - 40px / 2);
  display: flex;
  flex-direction: column;

  h3 {
    padding: 16px 0;
    text-align: center;
  }
  .card {
    flex-grow: 1;
    padding: 24px;
    flex-direction: column;
  }
}

.syntax {
  .card {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
  }

  h5 {
    margin-bottom: 16px;
  }

  .example {
    margin-right: 1em;
    white-space: nowrap;
  }

  .desc {
    flex: 1;
    white-space: nowrap;
  }

  ul {
    padding: 0;
    margin: 0;
    font-size: 13px;
    line-height: 2.5em;

    li {
      list-style: none;
      border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
    }
  }
}

.tokens {
  .token-group {

    .token-items {
      display: flex;
      flex-wrap: wrap;
      .token-item {
        font-size: 13px;
        border: 1px solid hsla(0, 0%, 0%, 0.2);
        margin-right: 4px;
        margin-bottom: 4px;
        border-radius: 4px;
        padding: 0px 4px;
      }
    }
  }
  .token-group + .token-group {
    margin-top: 16px;
  }
}

h5 {
  margin: 0 0 8px 0;
}

.repo-link {
  text-align: center;
  padding: 16px 0;
  a {
    font-size: 13px;
    color: hsla(0, 0%, 0%, 0.75);
  }
}

@media screen and (max-width: 1024px) {
  .doc {
    flex-direction: column;
    .tokens, .syntax {
      width: 100%;
      margin-top: 40px;
    }
  }
}
// @media screen and (max-width: 768px)
</style>
