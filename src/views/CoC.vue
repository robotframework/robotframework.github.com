<template>
  <div class="container narrow mb-xlarge pl-small pr-small">
    <div class="row mb-large mt-large">
      <button v-if="cameFromHome" @click="$router.go(-1)" class="color-theme type-underline">
        Back
      </button>
      <router-link v-else :to="{ name: 'Home' }">
        Back
      </router-link>
    </div>
    <h2>
      Robot Framework Code of Ethics
    </h2>
    <p>
      ROBOT FRAMEWORK FOUNDATION is dedicated to providing a harassment-free experience for everyone,
      regardless of gender, gender identity and expression, sexual orientation, disability, physical
      appearance, body size, age, race, or religion. We do not tolerate harassment of participants in any
      form.
    </p>
    <p>
      This code of ethics applies to all ROBOT FRAMEWORK spaces, both online and off.
      Anyone who violates this code of ethics may be sanctioned or expelled from these spaces at the
      discretion of the Robot Framework board.
    </p>
    <p>
      Some ROBOT FRAMEWORK spaces may have additional rules in place, which will be made clearly available
      to participants. Participants are responsible for knowing and abiding by these rules.
      If you are being harassed by a member of ROBOT FRAMEWORK, notice that someone else is being
      harassed, or have any other concerns, please Contact
      <a href="mailto: awareness@robotframework.org">awareness@robotframework.org</a>.
    </p>
    <h3 class="mt-large">Harassment includes</h3>
    <ul>
      <li>
        Offensive comments related to gender, gender identity and expression, sexual orientation, disability, mental illness, neuro(a)typicality, physical appearance, body size, age, race, or religion.
      </li>
      <li>
        Unwelcome comments regarding a person’s lifestyle choices and practices, including those related to food, health, parenting, drugs, and employment.
      </li>
      <li>
        Deliberate misgendering or use of ‘dead’ or rejected names.
      </li>
      <li>
        Gratuitous or off-topic sexual images or behaviour  in spaces where they’re not appropriate.
      </li>
      <li>
        Physical contact and simulated physical contact (eg, textual descriptions like “*hug*” or “*backrub*”) without consent or after a request to stop.
      </li>
      <li>
        Threats of violence.
      </li>
      <li>
        Incitement of violence towards any individual, including encouraging a person to commit suicide or to engage in self-harm.
      </li>
      <li>
        Deliberate intimidation.
      </li>
      <li>
        Stalking or following.
      </li>
      <li>
        Harassing photography or recording, including logging online activity for harassment purposes.
      </li>
      <li>
        Sustained disruption of discussion.
      </li>
      <li>
        Unwelcome sexual attention.
      </li>
      <li>
        Pattern of inappropriate social contact, such as requesting/assuming inappropriate levels of intimacy with others
      </li>
      <li>
        Continued one-on-one communication after requests to cease.
      </li>
      <li>
        Deliberate “outing” of any aspect of a person’s identity without their consent except as necessary to protect vulnerable people from intentional abuse.
      </li>
      <li>
        Publication of non-harassing private communication.
      </li>
    </ul>
    <p>
      ROBOT FRAMEWORK community prioritizes marginalized people’s safety over privileged people’s comfort. The Robot Framework board reserves the right not to act on complaints regarding:
    </p>
    <ul>
      <li>
        ‘Reverse’ -isms, including ‘reverse racism,’ ‘reverse sexism,’ and ‘cisphobia’
      </li>
      <li>
        Reasonable communication of boundaries, such as “leave me alone,” “go away,” or “I’m not discussing this with you.”
      </li>
      <li>
        Communicating in a ‘tone’ you don’t find congenial
      </li>
      <li>
        Criticizing racist, sexist, cissexist, or otherwise oppressive behaviour or assumptions
      </li>
    </ul>
    <h3 class="mt-large">Reporting</h3>
    <ul>
      <li>
        If you are being harassed by a member of ROBOT FRAMEWORK, notice that someone else is being harassed, or have any other concerns, please contact <a style="display: inline;" href="mailto: awareness@robotframework.org">awareness@robotframework.org</a>. If the person who is harassing you is on the team, they will recuse themselves from handling your incident. We will respond as promptly as we can.
      </li>
      <li>
        This code of ethics applies to ROBOT FRAMEWORK spaces, but if you are being harassed by a member of ROBOT FRAMEWORK outside our spaces, we still want to know about it. We will take all good-faith reports of harassment by ROBOT FRAMEWORK members seriously. This includes harassment outside our spaces and harassment that took place at any point in time. The abuse team reserves the right to exclude people from ROBOT FRAMEWORK based on their past behaviour, including behaviour outside ROBOT FRAMEWORK spaces and behaviour towards people who are not in ROBOT FRAMEWORK community.
      </li>
      <li>
        In order to protect volunteers from abuse and burnout, we reserve the right to reject any report we believe to have been made in bad faith. Reports intended to silence legitimate criticism may be deleted without response.
      </li>
      <li>
        We will respect confidentiality requests for the purpose of protecting victims of abuse. At our discretion, we may publicly name a person about whom we’ve received harassment complaints, or privately warn third parties about them, if we believe that doing so will increase the safety of ROBOT FRAMEWORK members or the general public. We will not name harassment victims without their affirmative consent.
      </li>
    </ul>
    <h3 class="mt-large">Consequences</h3>
    <ul>
      <li>
        Participants asked to stop any harassing behaviour are expected to comply immediately.
      </li>
      <li>
        If a participant engages in harassing behaviour, the Robot Framework board may take any action they deem appropriate, up to and including expulsion from all ROBOT FRAMEWORK spaces and identification of the participant as a harasser to other ROBOT FRAMEWORK members or the general public.
      </li>
    </ul>
    <div class="row mb-large mt-large">
      <button v-if="cameFromHome" @click="$router.go(-1)" class="color-theme type-underline">
        Back
      </button>
      <router-link v-else :to="{ name: 'Home' }">
        Back
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Coc',
  data: () => ({
    cameFromHome: false
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // for using browser's back functionality when 'back' link is clicked
      // to retain scroll position
      vm.cameFromHome = from.name === 'Home'
    })
  }
}
</script>
