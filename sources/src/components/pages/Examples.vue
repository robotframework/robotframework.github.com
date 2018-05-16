<template>
  <section id="examples">

        <text-block :data="data"/> 
    <div class="row">
    
      <div class="col-md-12 order-md-2 order-lg-1">
          <b-tabs cards pills class="nav-fill card " v-model="tabIndex">


          <b-tab title="EXAMPLE 1" @click="changeTabText(tabIndex)">
            <pre class="highlight"><span class="gh">*** Settings ***</span><span class="p"></span>
<span class="kn">Documentation</span><span class="p">     </span><span class="s">A test suite with a single test for valid login.</span><span class="p"></span>
<span class="p">...</span>
<span class="p">...               </span><span class="s">This test has a workflow that is created using keywords in</span><span class="p"></span>
<span class="p">...               </span><span class="s">the imported resource file.</span><span class="p"></span>
<span class="kn">Resource</span><span class="p">          </span><span class="nn">resource.txt</span><span class="p"></span>

<span class="gh">*** Test Cases ***</span><span class="p"></span>
<span class="gu">Valid Login</span><span class="p"></span>
<span class="p">    </span><span class="nf">Open Browser To Login Page</span><span class="p"></span>
<span class="p">    </span><span class="nf">Input Username</span><span class="p">    </span><span class="s">demo</span><span class="p"></span>
<span class="p">    </span><span class="nf">Input Password</span><span class="p">    </span><span class="s">mode</span><span class="p"></span>
<span class="p">    </span><span class="nf">Submit Credentials</span><span class="p"></span>
<span class="p">    </span><span class="nf">Welcome Page Should Be Open</span><span class="p"></span>
<span class="p">    [</span><span class="kn">Teardown</span><span class="p">]    </span><span class="nf">Close Browser</span><span class="p"></span>
                    </pre>
          </b-tab>
          <b-tab title="EXAMPLE 2" @click="changeTabText(tabIndex)">
            <div class="row">
              <div class="col-xl-6 col-md-12">
                <b-img v-b-modal.modal2 class="img-fluid" :src="require('@/assets/img/report.png')" id="report"/>
              </div>
              <div class="col-xl-6 col-md-12">
                <b-img v-b-modal.modal3 class="img-fluid" :src="require('@/assets/img/log.jpg')" id="log"/>
              </div>
            </div>
              <b-modal class="d-none d-md-block" size="lg" id="modal2" hide-footer centered title="">
                 <b-img class="img-fluid" :src="require('@/assets/img/report.png')" alt="Robot Framework architecture" title=""/>
              </b-modal>
              <b-modal class="d-none d-md-block" size="lg" id="modal3" hide-footer centered title="">
                 <b-img class="img-fluid" :src="require('@/assets/img/log.jpg')" alt="" title=""/>
              </b-modal>
          </b-tab>


            <b-tab title="EXAMPLE 3" @click="changeTabText(tabIndex)">
            <div class="row">
              <div class="col-lg-12">
           <pre class="highlight"><span class="gh">*** Settings ***</span><span class="p"></span>
<span class="kn">Suite Setup</span><span class="p">       </span><span class="nf">Open Browser To Login Page</span><span class="p"></span>
<span class="kn">Suite Teardown</span><span class="p">    </span><span class="nf">Close Browser</span><span class="p"></span>
<span class="kn">Test Setup</span><span class="p">        </span><span class="nf">Go To Login Page</span><span class="p"></span>
<span class="kn">Test Template</span><span class="p">     </span><span class="nf">Login With Invalid Credentials Should Fail</span><span class="p"></span>
<span class="kn">Resource</span><span class="p">          </span><span class="nn">resource.txt</span><span class="p"></span>

<span class="gh">*** Test Cases ***</span><span class="p">               </span><span class="gh">User Name</span><span class="p">        </span><span class="gh">Password</span><span class="p"></span>
<span class="gu">Invalid Username</span><span class="p">                 </span><span class="s">invalid</span><span class="p">          ${</span><span class="nv">VALID PASSWORD</span><span class="p">}</span>
<span class="gu">Invalid Password</span><span class="p">                 ${</span><span class="nv">VALID USER</span><span class="p">}    </span><span class="s">invalid</span><span class="p"></span>
<span class="gu">Invalid Username And Password</span><span class="p">    </span><span class="s">invalid</span><span class="p">          </span><span class="s">whatever</span><span class="p"></span>
<span class="gu">Empty Username</span><span class="p">                   ${</span><span class="nv">EMPTY</span><span class="p">}         ${</span><span class="nv">VALID PASSWORD</span><span class="p">}</span>
<span class="gu">Empty Password</span><span class="p">                   ${</span><span class="nv">VALID USER</span><span class="p">}    ${</span><span class="nv">EMPTY</span><span class="p">}</span>
<span class="gu">Empty Username And Password</span><span class="p">      ${</span><span class="nv">EMPTY</span><span class="p">}         ${</span><span class="nv">EMPTY</span><span class="p">}</span>

<span class="gh">*** Keywords ***</span><span class="p"></span>
<span class="gu">Login With Invalid Credentials Should Fail</span><span class="p"></span>
<span class="p">    [</span><span class="kn">Arguments</span><span class="p">]    ${</span><span class="nv">username</span><span class="p">}    ${</span><span class="nv">password</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Input Username</span><span class="p">    ${</span><span class="nv">username</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Input Password</span><span class="p">    ${</span><span class="nv">password</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Submit Credentials</span><span class="p"></span>
<span class="p">    </span><span class="nf">Login Should Have Failed</span><span class="p"></span>

<span class="gu">Login Should Have Failed</span><span class="p"></span>
<span class="p">    </span><span class="nf">Location Should Be</span><span class="p">    ${</span><span class="nv">ERROR URL</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Title Should Be</span><span class="p">    </span><span class="s">Error Page</span><span class="p"></span>
                    </pre>
        </div>
        <div class="col">
          <pre class="highlight"><span class="gh">*** Settings ***</span><span class="p"></span>
<span class="kn">Library</span><span class="p">           </span><span class="nn">Selenium2Library</span><span class="p"></span>

<span class="gh">*** Variables ***</span><span class="p"></span>
<span class="p">${</span><span class="nv">SERVER</span><span class="p">}         </span><span class="s">localhost:7272</span><span class="p"></span>
<span class="p">${</span><span class="nv">BROWSER</span><span class="p">}        </span><span class="s">Firefox</span><span class="p"></span>
<span class="p">${</span><span class="nv">DELAY</span><span class="p">}          </span><span class="s">0</span><span class="p"></span>
<span class="p">${</span><span class="nv">VALID USER</span><span class="p">}     </span><span class="s">demo</span><span class="p"></span>
<span class="p">${</span><span class="nv">VALID PASSWORD</span><span class="p">}    </span><span class="s">mode</span><span class="p"></span>
<span class="p">${</span><span class="nv">LOGIN URL</span><span class="p">}      </span><span class="s">http://</span><span class="p">${</span><span class="nv">SERVER</span><span class="p">}</span><span class="s">/</span><span class="p"></span>
<span class="p">${</span><span class="nv">WELCOME URL</span><span class="p">}    </span><span class="s">http://</span><span class="p">${</span><span class="nv">SERVER</span><span class="p">}</span><span class="s">/welcome.html</span><span class="p"></span>
<span class="p">${</span><span class="nv">ERROR URL</span><span class="p">}      </span><span class="s">http://</span><span class="p">${</span><span class="nv">SERVER</span><span class="p">}</span><span class="s">/error.html</span><span class="p"></span>

<span class="gh">*** Keywords ***</span><span class="p"></span>
<span class="gu">Open Browser To Login Page</span><span class="p"></span>
<span class="p">    </span><span class="nf">Open Browser</span><span class="p">    ${</span><span class="nv">LOGIN URL</span><span class="p">}    ${</span><span class="nv">BROWSER</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Maximize Browser Window</span><span class="p"></span>
<span class="p">    </span><span class="nf">Set Selenium Speed</span><span class="p">    ${</span><span class="nv">DELAY</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Login Page Should Be Open</span><span class="p"></span>

<span class="gu">Login Page Should Be Open</span><span class="p"></span>
<span class="p">    </span><span class="nf">Title Should Be</span><span class="p">    </span><span class="s">Login Page</span><span class="p"></span>

<span class="gu">Go To Login Page</span><span class="p"></span>
<span class="p">    </span><span class="nf">Go To</span><span class="p">    ${</span><span class="nv">LOGIN URL</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Login Page Should Be Open</span><span class="p"></span>

<span class="gu">Input Username</span><span class="p"></span>
<span class="p">    [</span><span class="kn">Arguments</span><span class="p">]    ${</span><span class="nv">username</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Input Text</span><span class="p">    </span><span class="s">username_field</span><span class="p">    ${</span><span class="nv">username</span><span class="p">}</span>

<span class="gu">Input Password</span><span class="p"></span>
<span class="p">    [</span><span class="kn">Arguments</span><span class="p">]    ${</span><span class="nv">password</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Input Text</span><span class="p">    </span><span class="s">password_field</span><span class="p">    ${</span><span class="nv">password</span><span class="p">}</span>

<span class="gu">Submit Credentials</span><span class="p"></span>
<span class="p">    </span><span class="nf">Click Button</span><span class="p">    </span><span class="s">login_button</span><span class="p"></span>

<span class="gu">Welcome Page Should Be Open</span><span class="p"></span>
<span class="p">    </span><span class="nf">Location Should Be</span><span class="p">    ${</span><span class="nv">WELCOME URL</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Title Should Be</span><span class="p">    </span><span class="s">Welcome Page</span><span class="p"></span>
                  </pre></div></div>
          </b-tab>

          <b-tab title="EXAMPLE 4" @click="changeTabText(tabIndex)">
            <pre class="highlight"><span class="kn">from</span> <span class="nn">calculator</span> <span class="kn">import</span> <span class="n">Calculator</span><span class="p">,</span> <span class="n">CalculationError</span>

<span class="k">class</span> <span class="nc">CalculatorLibrary</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>
    <span class="k">def</span> <span class="nf">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_calc</span> <span class="o">=</span> <span class="n">Calculator</span><span class="p">()</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_result</span> <span class="o">=</span> <span class="s">''</span>

    <span class="k">def</span> <span class="nf">push_button</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">button</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_result</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">_calc</span><span class="o">.</span><span class="n">push</span><span class="p">(</span><span class="n">button</span><span class="p">)</span>

    <span class="k">def</span> <span class="nf">push_buttons</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">buttons</span><span class="p">):</span>
        <span class="k">for</span> <span class="n">button</span> <span class="ow">in</span> <span class="n">buttons</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="s">' '</span><span class="p">,</span><span class="s">''</span><span class="p">):</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">push_button</span><span class="p">(</span><span class="n">button</span><span class="p">)</span>

    <span class="k">def</span> <span class="nf">result_should_be</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">expected</span><span class="p">):</span>
        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">_result</span> <span class="o">!=</span> <span class="n">expected</span><span class="p">:</span>
            <span class="k">raise</span> <span class="ne">AssertionError</span><span class="p">(</span><span class="s">'</span><span class="si">%s</span><span class="s"> != </span><span class="si">%s</span><span class="s">'</span> <span class="o">%</span> <span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">_result</span><span class="p">,</span> <span class="n">expected</span><span class="p">))</span>

    <span class="k">def</span> <span class="nf">should_fail</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">expression</span><span class="p">):</span>
        <span class="k">try</span><span class="p">:</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">push_buttons</span><span class="p">(</span><span class="n">expression</span><span class="p">)</span>
        <span class="k">except</span> <span class="n">CalculationError</span><span class="p">,</span> <span class="n">err</span><span class="p">:</span>
            <span class="k">return</span> <span class="nb">str</span><span class="p">(</span><span class="n">err</span><span class="p">)</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="k">raise</span> <span class="ne">AssertionError</span><span class="p">(</span><span class="s">"'</span><span class="si">%s</span><span class="s">' should have failed"</span> <span class="o">%</span> <span class="n">expression</span><span class="p">)</span>
                    </pre>
          </b-tab>

          <b-tab title="EXAMPLE 5" @click="changeTabText(tabIndex)">
            <pre class="highlight"><span class="gh">*** Settings ***</span><span class="p"></span>
<span class="kn">Test Template</span><span class="p">     </span><span class="nf">Calculate</span><span class="p"></span>
<span class="kn">Library</span><span class="p">           </span><span class="nn">CalculatorLibrary</span><span class="p"></span>

<span class="gh">*** Test Cases ***</span><span class="p">    </span><span class="gh">Expression</span><span class="p">    </span><span class="gh">Expected</span><span class="p"></span>
<span class="gu">Additions</span><span class="p">             </span><span class="s">12 + 2 + 2</span><span class="p">    </span><span class="s">16</span><span class="p"></span>
<span class="p">                      </span><span class="s">2 + -3</span><span class="p">        </span><span class="s">-1</span><span class="p"></span>

<span class="gu">Substractions</span><span class="p">         </span><span class="s">12 - 2 - 2</span><span class="p">    </span><span class="s">8</span><span class="p"></span>
<span class="p">                      </span><span class="s">2 - -3</span><span class="p">        </span><span class="s">5</span><span class="p"></span>

<span class="gu">Multiplication</span><span class="p">        </span><span class="s">12 * 2 * 2</span><span class="p">    </span><span class="s">48</span><span class="p"></span>
<span class="p">                      </span><span class="s">2 * -3</span><span class="p">        </span><span class="s">-6</span><span class="p"></span>

<span class="gu">Division</span><span class="p">              </span><span class="s">12 / 2 / 2</span><span class="p">    </span><span class="s">3</span><span class="p"></span>
<span class="p">                      </span><span class="s">2 / -3</span><span class="p">        </span><span class="s">-1</span><span class="p"></span>

<span class="gu">Calculation error</span><span class="p">     [</span><span class="kn">Template</span><span class="p">]    </span><span class="nf">Calculation should fail</span><span class="p"></span>
<span class="p">                      </span><span class="s">kekkonen</span><span class="p">      </span><span class="s">Invalid button 'k'.</span><span class="p"></span>
<span class="p">                      ${</span><span class="nv">EMPTY</span><span class="p">}      </span><span class="s">Invalid expression.</span><span class="p"></span>
<span class="p">                      </span><span class="s">1 / 0</span><span class="p">         </span><span class="s">Division by zero.</span><span class="p"></span>

<span class="gh">*** Keywords ***</span><span class="p"></span>
<span class="gu">Calculate</span><span class="p"></span>
<span class="p">    [</span><span class="kn">Arguments</span><span class="p">]    ${</span><span class="nv">expression</span><span class="p">}    ${</span><span class="nv">expected</span><span class="p">}</span>
<span class="p">    </span><span class="nf">Push buttons</span><span class="p">    </span><span class="s">C</span><span class="p">${</span><span class="nv">expression</span><span class="p">}</span><span class="s">=</span><span class="p"></span>
<span class="p">    </span><span class="nf">Result should be</span><span class="p">    ${</span><span class="nv">expected</span><span class="p">}</span>

<span class="gu">Calculation should fail</span><span class="p"></span>
<span class="p">    [</span><span class="kn">Arguments</span><span class="p">]    ${</span><span class="nv">expression</span><span class="p">}    ${</span><span class="nv">expected</span><span class="p">}</span>
<span class="p">    ${</span><span class="nv">error</span><span class="p">} =    </span><span class="nf">Should fail</span><span class="p">    </span><span class="s">C</span><span class="p">${</span><span class="nv">expression</span><span class="p">}</span><span class="s">=</span><span class="p"></span>
<span class="p">    </span><span class="nf">Should be equal</span><span class="p">    ${</span><span class="nv">expected</span><span class="p">}    ${</span><span class="nv">error</span><span class="p">}</span>
                    </pre>
          </b-tab>


          <b-tab title="EXAMPLE 6" @click="changeTabText(tabIndex)">
            <pre class="highlight"><span class="gh">*** Settings ***</span><span class="p"></span>
<span class="kn">Library</span><span class="p">           </span><span class="nn">CalculatorLibrary</span><span class="p"></span>

<span class="gh">*** Test Cases ***</span><span class="p"></span>
<span class="gu">Addition</span><span class="p"></span>
<span class="p">    </span><span class="ge">Given </span><span class="nf">calculator has been cleared</span><span class="p"></span>
<span class="p">    </span><span class="ge">When </span><span class="nf">user types "1 + 1"</span><span class="p"></span>
<span class="p">    </span><span class="ge">and </span><span class="nf">user pushes equals</span><span class="p"></span>
<span class="p">    </span><span class="ge">Then </span><span class="nf">result is "2"</span><span class="p"></span>

<span class="gh">*** Keywords ***</span><span class="p"></span>
<span class="gu">Calculator has been cleared</span><span class="p"></span>
<span class="p">    </span><span class="nf">Push button</span><span class="p">    </span><span class="s">C</span><span class="p"></span>

<span class="gu">User types "</span><span class="p">${</span><span class="nv">expression</span><span class="p">}</span><span class="gu">"</span><span class="p"></span>
<span class="p">    </span><span class="nf">Push buttons</span><span class="p">    ${</span><span class="nv">expression</span><span class="p">}</span>

<span class="gu">User pushes equals</span><span class="p"></span>
<span class="p">    </span><span class="nf">Push button</span><span class="p">    </span><span class="s">=</span><span class="p"></span>

<span class="gu">Result is "</span><span class="p">${</span><span class="nv">result</span><span class="p">}</span><span class="gu">"</span><span class="p"></span>
<span class="p">    </span><span class="nf">Result should be</span><span class="p">    ${</span><span class="nv">result</span><span class="p">}</span>
                    </pre>
          </b-tab>
        </b-tabs>
        </div>
  </div>
 </section>
</template>

<script>
import TextBlock from "@/Components/TextBlock.vue";

export default {
  components: {
    TextBlock
  },
  data() {
    return {
      tabText: "",
      data: {
        header: "Examples",
        text: ""
      },
      tabIndex: 0,
      items: [
        {
          text:
            '<p> Let\'s start with a real-life example from our <a href="https://bitbucket.org/robotframework/webdemo" target="_blank">web demo project</a>. Here we have a test suite with one test case which tests that login is valid. As you can see, test data syntax is based on <span class="italic">keywords</span>. </p> <p> Keywords are composable, meaning you can define new keywords that use pre-existing keywords. This way, you can abstract details of testing to something that makes immediate sense; for example, we don\'t need to know what exactly the step <span class="teletype">Submit Credentials</span> actually does, unless we want to. Test cases are therefore clear and readable, with just the right level of abstraction to convey the <span class="italic">intent</span> of the test, rather than the nuts and bolts. </p> <p> See next example for what you\'re going to get once this example is run! </p>'
        },
        {
          text:
            '<p> Executing the test suite file from previous example, we get the meat and bone of Robot Framework: A comprehensive debriefing on what happened in the test execution in two parts: the <span class="bold"> Report</span> and the <span class="bold">Log</span>. </p> <p>This Report and Log are based on executing the test suite described in the previous example and is from our <a href="https://bitbucket.org/robotframework/webdemo" target="_blank">web demo project</a>.</p><p id="example-report-last-paragraph"> Report details clearly viewable statistics including Pass/Fail ratios and elapsed times. This gives you great overview on the test execution. </p> <p> Log details statistics from each step of the test execution, from keyword to keyword. It enables you to drill down on the specifics of the test in case of failure or otherwise. </p>'
        },
        {
          text:
            '<div class="caption margin vertical-content"> <p> Keywords can be defined outside of the test suite and be imported as an external resources. This means you can collect generally useful keywords to one place and share them throughout your project, keeping also the testing <a href="http://en.wikipedia.org/wiki/Don\'t_repeat_yourself" class="bold" target="_blank">DRY</a>! </p> <p> Below, we have test case testing invalid login in <a href="https://bitbucket.org/robotframework/webdemo">our very own web demo</a>. As you can see, we can abstract away a lot of necessary, but ultimately non-expressive nuts and bolts of the testing to the <span class="italic">resource file</span>.</p>'
        },
        {
          text:
            '<p> All keywords in Robot Framework come from some library. What if existing libraries do not have what you need? Easy! Just make a library of your own! </p><p> This example is from our <a href="https://bitbucket.org/robotframework/robotdemo" target="_blank">Robot Demo</a>. These keywords the tests use are implemented in plain Python. You can also do libraries in Java. </p>'
        },
        {
          text:
            '<p> <span class="bold"><a href="http://en.wikipedia.org/wiki/Data-driven_testing" target="_blank">Data-driven test development</a></span> is easy due to you being able to define templates for your tests. </p> <p> In this example, each test case adheres to the template set by <span class="teletype">Calculate</span> keyword. </p> <p> This example comes from <a href="https://bitbucket.org/robotframework/robotdemo" target="_blank">our another demo</a> displaying testing a simple calculator. Check it out! </p>'
        },
        {
          text:
            '<p> Want to do <a target="_blank" href="https://github.com/cucumber/cucumber/wiki/Gherkin">Gherkin-style</a> behaviour-driven test development made famous by <a href="http://cukes.info/" target="_blank">Cucumber</a>? No problem! That\'s baked in! </p><p> </p><p> Here is another example from our <a href="https://bitbucket.org/robotframework/robotdemo" target="_blank">Robot Demo</a> that shows how you can level the expressiveness of Given-When-Then in Robot Framework. </p>'
        }
      ]
    };
  },
  created: function() {
    this.changeTabText(this.tabIndex);
  },
  methods: {
    changeTabText(tabIndex) {
      this.data.text = this.items[tabIndex].text;
    }
  }
};
</script>
