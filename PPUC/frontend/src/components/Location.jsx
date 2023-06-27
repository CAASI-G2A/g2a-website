import React, { Component } from "react";
import _ from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "antd";
import Api from "../libs/api";
import ReactPDF from "@intelllex/react-pdf";
import regionInfoData from "../data/merge_data_allegheny_map.json";
import _default from "rc-trigger";
import Highlighter from "react-highlight-words";
import { removeStopwords, eng } from 'stopword'

class Location extends Component {
  constructor(props) {
    super(props);
    this.categories = {
      cityPayMisconduct: "Citys Pays for Misconduct",
      disqualifyComplaint: "Disqualifies Complaints",
      eraseMisconduct: "Erases Misconduct Records",
      limitOversight: "Limits Oversight",
      unfairInformation: "Gives Officer Unfair Access to Information",
    };
    this.state = {
      location: null,
      regionInfo: null,
      contract: null,
      contractPdf: null,
      problematicSentences: null,
    };
    console.log("Location props = ")
    console.log(this.props.searchQuery);

    this.modifyQuery= this.modifyQuery.bind(this);
    this.getText = this.getText.bind(this);
    this.getOffset = this.getOffset.bind(this);
    //this.scrollToContent = this.scrollToContent(this);
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  getText(){
    var text = document.getElementById("inputtext").value;
    var pels = document.querySelectorAll("p");
    for (var pe of pels){
        var te = pe.innerHTML;
        console.log(text);
        console.log(te.match(text));
        if (te.match(text)!=null){
            console.log(pe.innerHTML);
            var rect = getOffset(pe);
            console.log(rect);
            console.log(rect.left);
            console.log(rect.top);
            window.scrollBy(rect.left,rect.top)
        }
    }
  }

  modifyQuery(query){
    function getQueryWords(query) {
      if (typeof query === "string") {
        query = query.replace(/['"]+/g, "")

        let lowerQuery = query.toLowerCase().split(" ")
        let newQuery = removeStopwords(lowerQuery, eng)
          
        // If user input query is constructed solely of stop words, set query to original input
        query = (newQuery.length == 0) ? query : newQuery.join(" ")

        return [query.trim()]
      } else {
        throw 'Query is not a string';
      }
    }

    let searchQuery = '"' + query + '"';
    let searchQueryWords = getQueryWords(searchQuery);

    let queryArr = searchQueryWords[0].split(' ')
    return queryArr;
  }

  
  scrollToContent(content) {
    const element = $(`*:contains('${content}'):first`);
    $(window).scrollTop(element.offset().top);
  }
  
  
  componentDidMount() {
    //const queryWords = this.modifyQuery(this.props.searchQuery);
    //const important = queryWords[0];
    //this.scrollToContent(important);
    //window.scrollTo(0, $('div:contains("THE CONTENT YOU ARE SEARCHING FOR")').offset().top);
    //document.getElementById('scoller')?.scrollIntoView({ behavior: 'smooth' });
    //document.getElementById("scroller").scrollTo(0,0);
    //document.getElementById('scroller')?.scrollIntoView(true);

    //$("html, body").animate({ scrollTop: $('#test').offset().top }, 1000);
    //$("html").animate({ scrollTop: 0 }, 500);
    //$("html, #test").animate({ scrollTop: 1000 }, 500); //ORIGINAL WORKING SOLUTION
    //$(`*:contains('${alcohol}'):first`).animate({ scrollTop: 1000 }, 500);
    //$("#test").get(0).scrollIntoView({behavior: 'smooth'});
    //$('#DebugContainer')[0].scrollHeight
    //$("html").delay(2000).animate({ scrollTop: $('#test')[0].scrollHeight }, 500);

    /*
    setTimeout(function() {
      $("html").animate({ 
        scrollTop: $('#test').offset().top 
      }, 500);
    }, 1000);*/

    const queryWords = this.modifyQuery(this.props.searchQuery);
    const important = queryWords[0];
    setTimeout(function() {
      $("html").animate({ 
        scrollTop: $(`p:contains('${important}'):first`).offset().top 
      }, 500);
    }, 1000);

    // grab location id from request
    const { lid } = this.props.match.params;
    // make request for location specific data
    Api.getLocation(lid).then((resp) => {
      this.setState({
        location: resp,
      });
    });
    // make request for contract
    Api.getLocationContract(lid).then((resp) => {
      // split text lines
      resp.text = resp.text.split("\n");
      this.setState({
        contract: resp,
      });
    });
    // make request for problematic sentences
    Api.getLocationProblematicSentences(lid).then((resp) => {
      // go through list and assemble into more friendly dictionary
      let problematicSentences = {};
      for (let category of Object.keys(this.categories)) {
        problematicSentences[category] = [];
        for (let sentence of resp) {
          if (sentence[category] === true) {
            problematicSentences[category].push({
              text: sentence.text,
              impact: sentence.impact,
            });
          }
        }
      }
      this.setState({
        problematicSentences: problematicSentences,
      });
    });
  }

  render() {
    const { TabPane } = Tabs;

    const regionInfo = this.state.location
      && (_.filter(regionInfoData, {'Police_Agency_Name': this.state.location.name}).length 
      ? _.filter(regionInfoData, {'Police_Agency_Name': this.state.location.name})[0]: null);

    const queryWords = this.modifyQuery(this.props.searchQuery);
    console.log("Query words = ")
    console.log(queryWords);

    return (
      <div>
        {this.state.location && (
          <div className="jumbotron">
            <div className="row">
              <div className="col-md-9">
                <h1>{this.state.location.name} Contract</h1>
              </div>
            </div>
            <div className="row justify-content-end">
              {this.state.location.hasPdf && (
                <a
                  className="btn btn-primary mr-2"
                  href={Api.ENDPOINTS.getLocationContractFile(
                    this.state.location.id,
                    "pdf"
                  )}
                  download
                >
                  <span className="font-weight-bold">Download PDF </span>
                  <FontAwesomeIcon icon={faFileDownload} />
                </a>
              )}
              {this.state.location.hasTxt && (
                <a
                  className="btn btn-primary mr-2"
                  href={Api.ENDPOINTS.getLocationContractFile(
                    this.state.location.id,
                    "txt"
                  )}
                  download
                >
                  <span className="font-weight-bold">Download TXT </span>
                  <FontAwesomeIcon icon={faFileDownload} />
                </a>
              )}
            </div>
          </div>
        )}
        <div className="row">
          {this.state.location && (<div className="offset-md-8 col-md-4">
            <h3 className="text-center">Overview</h3>
            <table className="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th className="bg-light">Full time officers as of 2019</th>
                  {regionInfo ? <td className="align-middle">{regionInfo["2019_Full_Time_Police"]}</td> : <td className="align-middle">{"No info"}</td>}
                </tr>
                {/* <tr>
                  <th className="bg-light">Do they use a police bill of rights</th>
                  {regionInfo ? <td className="align-middle">{regionInfo["police_bill_of_rights"]}</td> : <td className="align-middle">{"No info"}</td>}
                </tr> */}
                <tr>
                  <th className="bg-light">Police budget percentage in 2019</th>
                  {regionInfo ? <td className="align-middle">{regionInfo["2019_Police_Budget_Percentage"]}</td> : <td className="align-middle">{"No info"}</td>}
                </tr>
                <tr>
                  <th className="bg-light">Police department website</th>
                  {regionInfo ? <td className="align-middle"><a href={regionInfo["Police_Department_Website"]}>Link</a></td> : <td className="align-middle">{"No info"}</td>}
                </tr>
              </tbody>
            </table>
          </div>)}
          <div className="offset-md-8 col-md-4" style={{ textAlign: 'right' }}>
            <a target="_blank" href="https://www.grietoaction.org/static/app/instructions/How_to_read_a_contract.pdf">Click for our brief “How to Read a Contract” guide</a>
            {/*<button onClick={() => this.getText()} type="submit" class="btn btn-danger">Find Text</button>
            <input id="inputtext" type="text"></input>*/}
          </div>
          {this.state.location && 
            (<Tabs defaultActiveKey="1" type="card" size={"large"}>
              <TabPane tab="text" key="1">
                {this.state.contract && (
                  <div className="col-md-12">
                    <h2>Contract</h2>
                    <hr className="my-4 border-top border-secondary" />
                    {this.state.contract.text.map((line, index) => (
                      <p key={index}>{line}
                      <Highlighter
                      highlightClassName="MyHC"
                      highlightStyle={{backgroundColor: "#ffd500"}}
                      searchWords={queryWords} 
                      autoEscape={true}
                      textToHighlight={line}/> 
                      </p>
                    ))}
                  </div>
                )}
              </TabPane>
              <TabPane tab="pdf" key="2">
                <div className="pdf_viewer_wrapper col-md-12">
                  {this.state.location.hasPdf && (
                    <ReactPDF
                      url={Api.ENDPOINTS.getLocationContractPdf(
                        this.state.location.id
                      )}
                      showProgressBar
                      showToolbox
                    />
                  )}
                </div>
              </TabPane>
            </Tabs>)}
        </div>
        <div id="test">
          test
        </div>
      </div>
    );
  }
}
export default Location;
