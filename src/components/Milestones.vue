<template>
  <div class="bg-grey-dark-darkmode pt-medium pb-medium">
    <h3 class="type-center color-theme">
      Development milestones
    </h3>
    <div class="row">
      <div
        v-for="(milestone, i) in milestonesSorted"
        :key="milestone.id"
        class="col-sm-12 col-md-6 col-lg-4 pl-small pr-small mb-small">
        <div class="card bg-white color-black p-small">
          <div class="row between middle">
            <a :href="milestone.html_url" target="_blank">
              <h4 class="type-large">
                {{ milestone.title }}
              </h4>
            </a>
            <div v-if="milestone.due_on" class="type-small">
              due: {{ format(new Date(milestone.due_on), 'MMM dd yyyy') }}
            </div>
          </div>
          <div v-if="milestone.description !== ''" class="type-small type-italic border-bottom-theme border-thin pb-small">
            <div
              :id="`milestone-${i}-description`"
              v-html="parseDescription(milestone.description)"
              class="milestone-description mt-small"
              :class="milestone.descriptionExpanded ? 'expanded' : ''" />
            <button
              v-if="!milestone.descriptionExpanded"
              class="type-small weight-bold type-underline"
              @click="milestone.descriptionExpanded = true">
              Expand
            </button>
          </div>
          <div v-if="milestone.issues.items.length" class="type-small">
            <h4 class="mt-small">
              Issues
            </h4>
            <div class="row">
              <div class="col-sm-6 pr-3xsmall">
                <button
                  class="theme type-xsmall w-100 type-center"
                  :class="milestone.issuesTab === 'open' ? 'active' : ''"
                  style="padding: 0.5rem 0.5rem;"
                  @click="milestone.issuesTab = 'open'">
                  Open ({{ milestone.open_issues }})
                </button>
              </div>
              <div class="col-sm-6 pl-3xsmall">
                <button
                  class="theme type-xsmall w-100 type-center"
                  :class="milestone.issuesTab === 'closed' ? 'active' : ''"
                  style="padding: 0.5rem 0.5rem;"
                  @click="milestone.issuesTab = 'closed'">
                  Closed ({{ milestone.closed_issues }})
                </button>
              </div>
            </div>
            <transition name="opacity" mode="out-in">
              <div class="row mt-xsmall" :key="milestone.issuesTab">
                <div
                  v-for="issue in milestone.issues.items.filter(({ state }) => milestone.issuesTab === state).slice(0, milestone.issuesExpanded ? undefined : 3)"
                  :key="issue.id"
                  class="card w-100 flex issue-card mb-xsmall type-small p-2xsmall">
                  <div v-html="parseIssueDescription(issue.title)" style="width: calc(100% - 1.5rem);" />
                  <a class="mt-3xsmall" :href="issue.html_url" target="_blank">
                    <new-tab-icon color="theme" size="1.25rem" />
                  </a>
                </div>
                <button
                  v-if="!milestone.issuesExpanded && milestone.issues.items.filter(({ state }) => milestone.issuesTab === state).length > 3"
                  class="type-small weight-bold type-underline ml-2xsmall"
                  @click="milestone.issuesExpanded = true">
                  Show all
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { format } from 'date-fns'
import { marked } from 'marked'
import NewTabIcon from './icons/NewTabIcon'

export default {
  name: 'Milestones',
  components: {
    NewTabIcon
  },
  data: () => ({
    milestones: []
  }),
  computed: {
    milestonesSorted() {
      return [
        ...this.milestones
          .filter(({ due_on: dueOn }) => dueOn)
          .sort((a, b) => (new Date(a.due_on) > new Date(b.due_on) ? 1 : -1)),
        ...this.milestones
          .filter(({ due_on: dueOn }) => !dueOn)
      ]
    }
  },
  created() {
    // sort by due date
    this.milestones = [
      ...this.$store.state.milestones
        .filter(({ due_on: dueOn }) => dueOn)
        .sort((a, b) => (new Date(a.due_on) > new Date(b.due_on) ? 1 : -1)),
      ...this.$store.state.milestones
        .filter(({ due_on: dueOn }) => !dueOn)
    ]
      .map((m) => ({
        ...m,
        descriptionExpanded: false,
        issuesExpanded: false,
        issuesTab: m.open_issues > 0 || m.closed_issues === 0 ? 'open' : 'closed'
      }))
    // sort issues by reactions
    this.milestones
      .forEach((m) => {
        m.issues.items.sort((a, b) => (a.reactions.total_count > b.reactions.total_count ? -1 : 1))
      })
    this.$nextTick(() => {
      this.milestones.forEach((m, i) => {
        const description = document.getElementById(`milestone-${i}-description`)
        if (!description) return
        if (description.childElementCount > 1) return
        if (description.firstChild && description.firstChild.scrollHeight > description.firstChild.offsetHeight) return
        m.descriptionExpanded = true
      })
    })
    console.log(this.milestones)
  },
  methods: {
    format,
    parseDescription: (t) => marked.parse(t),
    parseIssueDescription: (t) => marked.parseInline(t),
    expand(id) {
      console.log(document.getElementById(id).firstChild.scrollHeight)
      console.log(document.getElementById(id).firstChild.offsetHeight)
    }
  }
}
</script>

<style>
.milestone-description:not(.expanded) p:first-child {
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0;
}
.milestone-description:not(.expanded) p:first-child:after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(rgba(245, 245, 245, 0) 30%, rgba(245, 245, 245, 1) 100%);
  pointer-events: none;
}
.milestone-description:not(.expanded) p:not(:first-child) {
  display: none;
}

.issue-card {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
