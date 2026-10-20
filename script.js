/* DISTRICT ADMIN — Tamil Nadu Collectorate Dashboard
 * Vanilla JS prototype. Data persists in LocalStorage.
 * All records are fictional demonstration data. */

(function () {
  "use strict";

  /* ---------- Constants & departments ---------- */
  var DEPARTMENTS = [
    "Revenue & Public Grievances",
    "Roads, Water & Public Works",
    "Health & Public Health",
    "Education & Social Welfare",
    "Agriculture & Rural Development",
    "Law & Order & Emergency Coordination",
    "Environment, Sanitation & Disaster Management"
  ];

  var PRIORITIES = ["Low", "Medium", "High", "Urgent"];
  var TASK_STATUS = ["Pending", "In Progress", "Completed", "On Hold"];
  var GRIEV_STATUS = ["Open", "Under Review", "Resolved", "Closed"];
  var PROJ_STATUS = ["Planned", "In Progress", "On Hold", "Completed"];
  var MEETING_TYPES = [
    "District Review Meeting",
    "Weekly Grievance Meeting",
    "Department Review Meeting",
    "Field Inspection",
    "Public Event",
    "Disaster Preparedness Meeting",
    "Official Visit"
  ];
  var DOC_CATEGORIES = ["Letter", "Memo", "Petition", "Report", "Circular", "File Note", "Order", "Notice"];
  var DOC_STATUS = ["Received", "Under Process", "Action Taken", "Closed", "Pending"];

  var OFFICERS = [
    "District Collector",
    "Additional Collector",
    "Revenue Divisional Officer",
    "Tahsildar, Tiruchirappalli",
    "District Health Officer",
    "District Education Officer",
    "District Engineer (PWD)",
    "Superintendent of Police",
    "District Agricultural Officer",
    "District Environmental Engineer",
    "Project Director, DRDA",
    "Public Relations Officer"
  ];

  var AREAS = ["Srirangam", "Cantonment", "Golden Rock", "K. Abishekapuram", "Ariyamangalam", "Ponmalai", "Tiruverumbur", "Manachanallur", "Lalgudi", "Manapparai", "Thuraiyur", "Thottiyam"];

  /* ---------- Storage ---------- */
  var STORE_KEY = "tn_collectorate_data_v1";

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }
  function addDaysISO(days) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }
  function uid(prefix) {
    return (prefix || "ID") + "-" + Date.now().toString(36).toUpperCase().slice(-4) + Math.floor(Math.random() * 900 + 100);
  }

  function seedData() {
    return {
      tasks: [
        { id: uid("TSK"), title: "Review pending grievance petitions", description: "Go through grievances pending over 7 days and assign officers.", department: "Revenue & Public Grievances", date: todayISO(), deadline: addDaysISO(1), priority: "High", officer: "District Collector", status: "In Progress", kind: "daily" },
        { id: uid("TSK"), title: "Inspect Srirangam water tank works", description: "Site visit to new overhead tank near Ammamandapam.", department: "Roads, Water & Public Works", date: todayISO(), deadline: addDaysISO(2), priority: "Medium", officer: "District Engineer (PWD)", status: "Pending", kind: "daily" },
        { id: uid("TSK"), title: "Prepare PHC medical stock report", description: "Consolidate stock position from 12 primary health centres.", department: "Health & Public Health", date: addDaysISO(-3), deadline: addDaysISO(-1), priority: "Urgent", officer: "District Health Officer", status: "Pending", kind: "daily" },
        { id: uid("TSK"), title: "School infra audit — Lalgudi block", description: "Audit classrooms and toilets in 8 panchayat union schools.", department: "Education & Social Welfare", date: addDaysISO(-5), deadline: addDaysISO(3), priority: "Medium", officer: "District Education Officer", status: "In Progress", kind: "weekly" },
        { id: uid("TSK"), title: "Kuruvai procurement coordination", description: "Coordinate DPC procurement centres for paddy.", department: "Agriculture & Rural Development", date: addDaysISO(-2), deadline: addDaysISO(10), priority: "High", officer: "District Agricultural Officer", status: "In Progress", kind: "monthly" },
        { id: uid("TSK"), title: "Festival crowd management plan", description: "Prepare traffic and crowd plan for Vaikunta Ekadasi.", department: "Law & Order & Emergency Coordination", date: addDaysISO(-1), deadline: addDaysISO(6), priority: "High", officer: "Superintendent of Police", status: "Pending", kind: "weekly" },
        { id: uid("TSK"), title: "Solid waste review — Ariyamangalam", description: "Review compost yard operations and segregation targets.", department: "Environment, Sanitation & Disaster Management", date: addDaysISO(-8), deadline: addDaysISO(-2), priority: "Medium", officer: "District Environmental Engineer", status: "Completed", kind: "monthly" },
        { id: uid("TSK"), title: "Submit monthly progress report", description: "Compile departmental progress for the month.", department: "Revenue & Public Grievances", date: addDaysISO(-15), deadline: addDaysISO(-10), priority: "High", officer: "Additional Collector", status: "Completed", kind: "monthly" }
      ],
      grievances: [
        { id: uid("GRV"), subject: "Drainage overflow in Cantonment", description: "Storm water drain blocked near West Boulevard road.", department: "Roads, Water & Public Works", area: "Cantonment", dateReceived: addDaysISO(-9), priority: "High", officer: "District Engineer (PWD)", deadline: addDaysISO(-2), status: "Under Review", action: "Inspection done, estimate prepared.", resolution: "", dateClosed: "" },
        { id: uid("GRV"), subject: "Street light not working", description: "Street lights off for two weeks in Woraiyur 4th cross.", department: "Roads, Water & Public Works", area: "Srirangam", dateReceived: addDaysISO(-5), priority: "Medium", officer: "District Engineer (PWD)", deadline: addDaysISO(2), status: "Open", action: "", resolution: "", dateClosed: "" },
        { id: uid("GRV"), subject: "Missing mid-day meal supply", description: "Panchayat union school reports no meal supply for 3 days.", department: "Education & Social Welfare", area: "Manachanallur", dateReceived: addDaysISO(-2), priority: "Urgent", officer: "District Education Officer", deadline: addDaysISO(1), status: "Open", action: "", resolution: "", dateClosed: "" },
        { id: uid("GRV"), subject: "Primary health centre staff shortage", description: "PHC Thottiyam reports no doctor for evening OP.", department: "Health & Public Health", area: "Thottiyam", dateReceived: addDaysISO(-14), priority: "Urgent", officer: "District Health Officer", deadline: addDaysISO(-7), status: "Resolved", action: "Additional doctor posted on deputation.", resolution: "Doctor deputed from Manapparai GH.", dateClosed: addDaysISO(-5) },
        { id: uid("GRV"), subject: "Illegal sand quarry complaint", description: "Complaint of quarrying near Cauvery bank at Gunnamangalam.", department: "Environment, Sanitation & Disaster Management", area: "Thuraiyur", dateReceived: addDaysISO(-7), priority: "High", officer: "District Environmental Engineer", deadline: addDaysISO(3), status: "Under Review", action: "Joint inspection with revenue team scheduled.", resolution: "", dateClosed: "" }
      ],
      projects: [
        { id: uid("PRJ"), name: "Relaying of Mc Donalds Road", department: "Roads, Water & Public Works", location: "Cantonment", budget: 4200000, startDate: addDaysISO(-60), targetDate: addDaysISO(20), progress: 65, officer: "District Engineer (PWD)", status: "In Progress", remarks: "Bituminous work in progress." },
        { id: uid("PRJ"), name: "Combined Drinking Water Scheme — Srirangam", department: "Roads, Water & Public Works", location: "Srirangam", budget: 18500000, startDate: addDaysISO(-120), targetDate: addDaysISO(75), progress: 48, officer: "District Engineer (PWD)", status: "In Progress", remarks: "Sump and pump house completed." },
        { id: uid("PRJ"), name: "Government High School — Additional Classrooms", department: "Education & Social Welfare", location: "Lalgudi", budget: 3200000, startDate: addDaysISO(-30), targetDate: addDaysISO(90), progress: 25, officer: "District Education Officer", status: "In Progress", remarks: "Foundation work ongoing." },
        { id: uid("PRJ"), name: "Public Toilets — Bus Stand", department: "Environment, Sanitation & Disaster Management", location: "Cantonment", budget: 1500000, startDate: addDaysISO(-45), targetDate: addDaysISO(10), progress: 80, officer: "District Environmental Engineer", status: "In Progress", remarks: "Finishing work pending." },
        { id: uid("PRJ"), name: "PHC Upgradation — Manapparai", department: "Health & Public Health", location: "Manapparai", budget: 5400000, startDate: addDaysISO(-90), targetDate: addDaysISO(-5), progress: 95, officer: "District Health Officer", status: "In Progress", remarks: "Awaiting electrical inspection." },
        { id: uid("PRJ"), name: "Rural Road — Thottiyam to Thiruvathavur", department: "Roads, Water & Public Works", location: "Thottiyam", budget: 6700000, startDate: addDaysISO(-150), targetDate: addDaysISO(-20), progress: 100, officer: "District Engineer (PWD)", status: "Completed", remarks: "Road opened for traffic." }
      ],
      meetings: [
        { id: uid("MTG"), type: "District Review Meeting", date: todayISO(), time: "10:30", venue: "Collectorate Conference Hall", agenda: "Monthly review of all departmental schemes.", departments: "Revenue & Public Grievances, Health & Public Health, Education & Social Welfare", actionPoints: "Submit pending utilisation certificates; complete Aadhaar seeding by month-end." },
        { id: uid("MTG"), type: "Weekly Grievance Meeting", date: todayISO(), time: "15:00", venue: "Grievance Cell", agenda: "Review grievances older than 7 days.", departments: "Revenue & Public Grievances, Roads, Water & Public Works", actionPoints: "Cantonment drainage to be cleared within 3 days." },
        { id: uid("MTG"), type: "Field Inspection", date: addDaysISO(2), time: "09:00", venue: "Srirangam Water Tank Site", agenda: "Inspect overhead tank construction.", departments: "Roads, Water & Public Works", actionPoints: "Quality test report to be submitted by PWD." },
        { id: uid("MTG"), type: "Disaster Preparedness Meeting", date: addDaysISO(5), time: "11:00", venue: "Collectorate EOC", agenda: "North-east monsoon preparedness.", departments: "Environment, Sanitation & Disaster Management, Law & Order & Emergency Coordination", actionPoints: "Stock relief supplies; identify shelters." },
        { id: uid("MTG"), type: "Public Event", date: addDaysISO(-10), time: "16:00", venue: "District Sports Complex", agenda: "Independence Day sports prize distribution.", departments: "Education & Social Welfare", actionPoints: "List of awardees circulated to PRO." }
      ],
      documents: [
        { id: uid("DOC"), title: "Letter from Municipal Commissioner", category: "Letter", department: "Roads, Water & Public Works", dateReceived: addDaysISO(-6), refNo: "MC/2026/447", related: "GRV", status: "Under Process", notes: "Regarding drainage overflow complaints.", fileName: "" },
        { id: uid("DOC"), title: "Memo — Mid-day meal supply", category: "Memo", department: "Education & Social Welfare", dateReceived: addDaysISO(-2), refNo: "CEO/Memo/118", related: "GRV", status: "Action Taken", notes: "Supplier changed; supply resumed.", fileName: "" },
        { id: uid("DOC"), title: "Health stock report — October", category: "Report", department: "Health & Public Health", dateReceived: addDaysISO(-4), refNo: "DHO/RPT/10", related: "PRJ", status: "Received", notes: "Stock position of 12 PHCs.", fileName: "" },
        { id: uid("DOC"), title: "Circular — Monsoon preparedness", category: "Circular", department: "Environment, Sanitation & Disaster Management", dateReceived: addDaysISO(-3), refNo: "GOS/Dis/22", related: "", status: "Pending", notes: "Compliance report requested.", fileName: "" }
      ],
      lawOrder: [
        { id: uid("LAW"), event: "Vaikunta Ekadasi crowd arrangements", date: addDaysISO(12), venue: "Srirangam Ranganathaswamy Temple", type: "Crowd Management", departments: "Law & Order & Emergency Coordination, Revenue & Public Grievances", officer: "Superintendent of Police", status: "Pending", notes: "Deploy 12 DSPs, 40 inspectors; medical camps at 4 points." },
        { id: uid("LAW"), event: "PM’s road show — traffic plan", date: addDaysISO(4), venue: "McDonalds Road to Junction", type: "Traffic Arrangement", departments: "Law & Order & Emergency Coordination", officer: "Superintendent of Police", status: "In Progress", notes: "Diversions to be announced 48h prior." },
        { id: uid("LAW"), event: "Farmers rally coordination", date: addDaysISO(-8), venue: "Collectorate Ground", type: "Public Event", departments: "Law & Order & Emergency Coordination, Revenue & Public Grievances", officer: "Additional Collector", status: "Completed", notes: "Event concluded peacefully." }
      ],
      visits: [
        { id: uid("VIS"), visitor: "Hon’ble Minister for Municipal Administration", designation: "Minister", purpose: "Review drinking water scheme", date: addDaysISO(3), time: "11:00", venue: "Srirangam Combined WS Site", department: "Roads, Water & Public Works", checklist: ["Clean approach road", "Display board ready", "Briefing note circulated", "Security arrangements", "Media podium"] },
        { id: uid("VIS"), visitor: "Chief Secretary", designation: "Chief Secretary, GoTN", purpose: "District performance review", date: addDaysISO(9), time: "10:00", venue: "Collectorate Conference Hall", department: "Revenue & Public Grievances", checklist: ["Presentation deck ready", "Departmental reports compiled", "Hospitality arranged", "Convoy route finalised"] }
      ],
      disaster: [
        { id: uid("DSR"), activity: "Relief shelter readiness audit", date: addDaysISO(-5), area: "Cantonment", resources: "Blankets 500, Mats 300, Water cans 200", departments: "Environment, Sanitation & Disaster Management", officer: "District Environmental Engineer", status: "In Progress", notes: "9 of 14 shelters inspected." },
        { id: uid("DSR"), activity: "Cauvery flood watch point setup", date: addDaysISO(2), area: "Srirangam", resources: "Boats 4, Life jackets 60, Wireless sets 6", departments: "Environment, Sanitation & Disaster Management, Law & Order & Emergency Coordination", officer: "Superintendent of Police", status: "Pending", notes: "Watch points at Mukkombu and Ammamandapam." },
        { id: uid("DSR"), activity: "Medical camp stock preposition", date: addDaysISO(-1), area: "Manapparai", resources: "ORS 2000, Bleaching powder 500kg", departments: "Health & Public Health", officer: "District Health Officer", status: "Completed", notes: "Stock positioned at 3 PHCs." }
      ]
    };
  }

  function loadStore() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) {
        var s = seedData();
        localStorage.setItem(STORE_KEY, JSON.stringify(s));
        return s;
      }
      var parsed = JSON.parse(raw);
      ["tasks", "grievances", "projects", "meetings", "documents", "lawOrder", "visits", "disaster"].forEach(function (k) {
        if (!parsed[k]) parsed[k] = [];
      });
      return parsed;
    } catch (e) {
      return seedData();
    }
  }
  function saveStore() {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  var store = loadStore();

  /* ---------- Helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function fmtDate(d) {
    if (!d) return "—";
    var dt = new Date(d + "T00:00:00");
    if (isNaN(dt)) return esc(d);
    return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }
  function fmtINR(n) {
    n = Number(n) || 0;
    return "₹" + n.toLocaleString("en-IN");
  }
  function isOverdue(deadline, status) {
    if (!deadline) return false;
    if (status === "Completed" || status === "Closed" || status === "Resolved") return false;
    return new Date(deadline + "T00:00:00") < new Date(todayISO() + "T00:00:00");
  }
  function daysBetween(a, b) {
    return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);
  }

  var toastTimer = null;
  function toast(msg, type) {
    var t = $("#toast");
    t.textContent = msg;
    t.className = "toast show" + (type ? " " + type : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = "toast"; }, 2600);
  }

  function priClass(p) {
    return ({ Low: "low", Medium: "medium", High: "high", Urgent: "urgent" })[p] || "low";
  }
  function statusClass(s) {
    var m = {
      "Pending": "pending", "In Progress": "progress", "Completed": "completed", "On Hold": "hold",
      "Open": "open", "Under Review": "pending", "Resolved": "completed", "Closed": "closed",
      "Planned": "pending", "Received": "pending", "Under Process": "progress", "Action Taken": "completed"
    };
    return m[s] || "low";
  }
  function badge(text, cls) {
    return '<span class="badge ' + (cls || statusClass(text)) + '">' + esc(text) + '</span>';
  }
  function priorityBadge(p) { return badge(p, priClass(p)); }

  /* ---------- Modal ---------- */
  function openModal(title, bodyHTML, onMount) {
    $("#modalTitle").textContent = title;
    $("#modalBody").innerHTML = bodyHTML;
    $("#modalOverlay").hidden = false;
    if (typeof onMount === "function") onMount($("#modalBody"));
  }
  function closeModal() {
    $("#modalOverlay").hidden = true;
    $("#modalBody").innerHTML = "";
  }

  var confirmCb = null;
  function confirmAction(title, text, onOk) {
    $("#confirmTitle").textContent = title;
    $("#confirmText").textContent = text;
    confirmCb = onOk;
    $("#confirmOverlay").hidden = false;
  }
  function closeConfirm() {
    $("#confirmOverlay").hidden = true;
    confirmCb = null;
  }

  /* ---------- Form builder ---------- */
  function field(label, name, type, opts) {
    opts = opts || {};
    var req = opts.required ? ' <span class="req">*</span>' : "";
    var full = opts.full ? " full" : "";
    var hint = opts.hint ? '<span class="form-hint">' + esc(opts.hint) + "</span>" : "";
    var val = opts.value != null ? opts.value : "";
    var attr = 'name="' + name + '" id="f_' + name + '"';
    var html = '<div class="form-field' + full + '"><label for="f_' + name + '">' + esc(label) + req + '</label>';
    if (type === "select") {
      html += '<select class="field" ' + attr + '>';
      if (opts.placeholder) html += '<option value="">' + esc(opts.placeholder) + "</option>";
      (opts.options || []).forEach(function (o) {
        var ov = typeof o === "string" ? o : o.value;
        var ol = typeof o === "string" ? o : o.label;
        html += '<option value="' + esc(ov) + '"' + (ov === val ? " selected" : "") + ">" + esc(ol) + "</option>";
      });
      html += "</select>";
    } else if (type === "textarea") {
      html += '<textarea class="field" ' + attr + ' rows="3">' + esc(val) + "</textarea>";
    } else if (type === "checkbox-group") {
      html += '<div class="checklist" ' + attr + ">";
      (opts.options || []).forEach(function (o) {
        var checked = (opts.value || []).indexOf(o) >= 0 ? " checked" : "";
        html += '<li><label><input type="checkbox" name="' + name + '" value="' + esc(o) + '"' + checked + "> " + esc(o) + "</label></li>";
      });
      html += "</div>";
    } else {
      var extra = opts.min ? ' min="' + opts.min + '"' : "";
      extra += opts.max ? ' max="' + opts.max + '"' : "";
      extra += opts.step ? ' step="' + opts.step + '"' : "";
      html += '<input class="field" type="' + type + '" ' + attr + ' value="' + esc(val) + '"' + extra + ">";
    }
    html += hint + "</div>";
    return html;
  }

  function readForm(root) {
    var data = {};
    $all(".field, .checklist", root).forEach(function (el) {
      if (el.classList.contains("checklist")) {
        var name = el.getAttribute("name");
        data[name] = $all('input[type=checkbox]:checked', el).map(function (c) { return c.value; });
        return;
      }
      var n = el.getAttribute("name");
      if (el.type === "checkbox") {
        data[n] = el.checked;
      } else if (el.type === "number") {
        data[n] = el.value === "" ? "" : Number(el.value);
      } else {
        data[n] = el.value.trim();
      }
    });
    return data;
  }

  function validateRequired(root, fields) {
    var ok = true;
    fields.forEach(function (f) {
      var el = $("#f_" + f, root);
      if (!el) return;
      var empty = el.value.trim() === "";
      if (empty) {
        el.style.borderColor = "var(--danger)";
        ok = false;
      } else {
        el.style.borderColor = "";
      }
    });
    if (!ok) toast("Please fill all required fields", "error");
    return ok;
  }

  function modalFooter(okText, okClass) {
    return '<div class="modal-foot"><button class="btn btn-ghost" id="m_cancel">Cancel</button><button class="btn ' + (okClass || "btn-primary") + '" id="m_save">' + esc(okText) + "</button></div>";
  }

  function bindModalSave(root, onSave) {
    $("#m_cancel", root).addEventListener("click", closeModal);
    $("#m_save", root).addEventListener("click", function () { onSave(root); });
  }

  /* ---------- CSV export ---------- */
  function exportCSV(filename, headers, rows) {
    var csv = [headers.join(",")].concat(rows.map(function (r) {
      return r.map(function (c) {
        var s = String(c == null ? "" : c);
        if (/[",\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
        return s;
      }).join(",");
    })).join("\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast("Exported " + filename, "success");
  }

  /* ---------- Toolbar helpers ---------- */
  function searchBox(onInput) {
    var el = document.createElement("input");
    el.className = "field search-input";
    el.type = "search";
    el.placeholder = "Search…";
    el.addEventListener("input", onInput);
    return el;
  }
  function filterSelect(options, onChange, placeholder) {
    var el = document.createElement("select");
    el.className = "field";
    var p = document.createElement("option");
    p.value = "";
    p.textContent = placeholder || "All";
    el.appendChild(p);
    options.forEach(function (o) {
      var opt = document.createElement("option");
      opt.value = o; opt.textContent = o;
      el.appendChild(opt);
    });
    el.addEventListener("change", onChange);
    return el;
  }

  /* ---------- Empty state ---------- */
  function emptyState(msg) {
    return '<div class="empty"><div class="ico">📭</div><p>' + esc(msg || "No records found.") + "</p><p>Try adjusting your search or filters.</p></div>";
  }

  /* ---------- Section container ---------- */
  function sectionEl(id) {
    var ex = $("#" + id + "-section");
    if (ex) return ex;
    var s = document.createElement("section");
    s.className = "section";
    s.id = id + "-section";
    $("#content").appendChild(s);
    return s;
  }

  function header(title, sub, actionsHTML) {
    return '<div class="section-head"><div><h2>' + esc(title) + '</h2><div class="sub">' + esc(sub || "") + "</div></div>" +
      '<div class="section-actions">' + (actionsHTML || "") + "</div></div>";
  }

  function noteBanner(text, type) {
    return '<div class="note-banner ' + (type || "") + '">' + esc(text) + "</div>";
  }

  /* ============================================================
     DASHBOARD
     ============================================================ */
  function renderDashboard() {
    var el = sectionEl("dashboard");
    var tasks = store.tasks, grv = store.grievances, proj = store.projects, mtg = store.meetings;
    var today = todayISO();

    var openGrv = grv.filter(function (g) { return g.status === "Open" || g.status === "Under Review"; }).length;
    var highPending = tasks.filter(function (t) {
      return (t.priority === "High" || t.priority === "Urgent") && t.status !== "Completed";
    }).length;
    var projInProgress = proj.filter(function (p) { return p.status === "In Progress"; }).length;
    var mtgToday = mtg.filter(function (m) { return m.date === today; }).length;
    var overdue = tasks.filter(function (t) { return isOverdue(t.deadline, t.status); }).length;
    var completedMonth = tasks.filter(function (t) {
      return t.status === "Completed" && t.date && t.date.slice(0, 7) === today.slice(0, 7);
    }).length;

    el.innerHTML = header("Dashboard", "Live summary of district collectorate activity — demonstration data") +
      '<div class="cards">' +
      statCard("Open Grievances", openGrv, "Awaiting action", "") +
      statCard("High / Urgent Pending", highPending, "Priority tasks not completed", "alt") +
      statCard("Projects In Progress", projInProgress, "Active development works", "ok") +
      statCard("Meetings Today", mtgToday, "Scheduled for " + fmtDate(today), "") +
      statCard("Overdue Tasks", overdue, "Past their deadline", "danger") +
      statCard("Completed This Month", completedMonth, "Tasks closed in " + today.slice(0, 7), "ok") +
      "</div>" +
      '<div class="panel"><div class="panel-head"><h3>Recent Grievances</h3><button class="btn btn-sm" data-nav="grievances">View all</button></div><div class="panel-body"><div class="table-wrap">' +
      grievTable(grv.slice(0, 4)) + "</div></div></div>" +
      '<div class="panel"><div class="panel-head"><h3>Upcoming Meetings</h3><button class="btn btn-sm" data-nav="meetings">View all</button></div><div class="panel-body"><div class="table-wrap">' +
      meetingTable(mtg.filter(function (m) { return m.date >= today; }).slice(0, 4)) + "</div></div></div>" +
      '<div class="panel"><div class="panel-head"><h3>Active Projects</h3><button class="btn btn-sm" data-nav="projects">View all</button></div><div class="panel-body"><div class="table-wrap">' +
      projectTable(proj.filter(function (p) { return p.status === "In Progress"; }).slice(0, 4)) + "</div></div></div>";

    $all("[data-nav]", el).forEach(function (b) {
      b.addEventListener("click", function () { navigate(b.getAttribute("data-nav")); });
    });
  }

  function statCard(label, value, meta, cls) {
    return '<div class="stat-card ' + (cls || "") + '"><div class="label">' + esc(label) +
      '</div><div class="value">' + esc(value) + '</div><div class="meta">' + esc(meta || "") + "</div></div>";
  }

  /* ============================================================
     PLANNERS (daily / weekly / monthly)
     ============================================================ */
  function renderPlanner(kind, title, sub) {
    var el = sectionEl(kind);
    var panel = document.createElement("div");
    panel.className = "panel";

    var toolbar = document.createElement("div");
    toolbar.className = "panel-head";
    var h = document.createElement("h3");
    h.textContent = "Tasks";
    toolbar.appendChild(h);
    var tw = document.createElement("div");
    tw.className = "toolbar";

    var search = searchBox(function () { draw(); });
    var depFilter = filterSelect(DEPARTMENTS, function () { draw(); }, "All Departments");
    var priFilter = filterSelect(PRIORITIES, function () { draw(); }, "All Priorities");
    var stFilter = filterSelect(TASK_STATUS, function () { draw(); }, "All Status");
    var overdueOnly = document.createElement("label");
    overdueOnly.style.cssText = "display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--text-muted)";
    overdueOnly.innerHTML = '<input type="checkbox" id="od_' + kind + '"> Overdue only';
    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary";
    addBtn.textContent = "+ Add Task";

    tw.appendChild(search); tw.appendChild(depFilter); tw.appendChild(priFilter); tw.appendChild(stFilter);
    tw.appendChild(overdueOnly); tw.appendChild(addBtn);
    toolbar.appendChild(tw);
    panel.appendChild(toolbar);

    var body = document.createElement("div");
    body.className = "panel-body";
    panel.appendChild(body);
    el.innerHTML = header(title, sub);
    el.appendChild(panel);

    function filtered() {
      var q = search.value.toLowerCase();
      var dep = depFilter.value, pri = priFilter.value, st = stFilter.value;
      var od = $("#od_" + kind).checked;
      return store.tasks.filter(function (t) {
        if (t.kind !== kind) return false;
        if (q && (t.title + " " + t.description + " " + t.officer).toLowerCase().indexOf(q) < 0) return false;
        if (dep && t.department !== dep) return false;
        if (pri && t.priority !== pri) return false;
        if (st && t.status !== st) return false;
        if (od && !isOverdue(t.deadline, t.status)) return false;
        return true;
      });
    }

    function draw() {
      var rows = filtered();
      if (!rows.length) { body.innerHTML = emptyState("No tasks match your filters."); return; }
      var html = '<div class="table-wrap"><table class="data"><thead><tr>' +
        "<th>ID</th><th>Title</th><th>Department</th><th>Date</th><th>Deadline</th><th>Priority</th><th>Officer</th><th>Status</th><th>Actions</th>" +
        "</tr></thead><tbody>";
      rows.forEach(function (t) {
        var od = isOverdue(t.deadline, t.status);
        html += '<tr class="' + (od ? "row-overdue" : "") + '">' +
          '<td class="col-id">' + esc(t.id) + "</td>" +
          "<td><strong>" + esc(t.title) + "</strong>" + (t.description ? '<div style="font-size:11px;color:var(--text-soft)">' + esc(t.description) + "</div>" : "") + "</td>" +
          "<td>" + esc(t.department) + "</td>" +
          "<td>" + fmtDate(t.date) + "</td>" +
          "<td>" + fmtDate(t.deadline) + (od ? ' <span class="badge urgent">Overdue</span>' : "") + "</td>" +
          "<td>" + priorityBadge(t.priority) + "</td>" +
          "<td>" + esc(t.officer) + "</td>" +
          "<td>" + badge(t.status) + "</td>" +
          '<td><button class="btn btn-sm" data-edit="' + t.id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + t.id + '">Delete</button></td>' +
          "</tr>";
      });
      html += "</tbody></table></div>";
      body.innerHTML = html;
      $all("[data-edit]", body).forEach(function (b) { b.addEventListener("click", function () { taskForm(kind, b.getAttribute("data-edit")); }); });
      $all("[data-del]", body).forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-del");
          confirmAction("Delete Task", "Delete this task? This cannot be undone.", function () {
            store.tasks = store.tasks.filter(function (t) { return t.id !== id; });
            saveStore(); draw(); refreshDashboard(); toast("Task deleted", "success");
          });
        });
      });
    }

    addBtn.addEventListener("click", function () { taskForm(kind); });
    $("#od_" + kind).addEventListener("change", draw);
    draw();
  }

  function taskForm(kind, id) {
    var t = id ? store.tasks.filter(function (x) { return x.id === id; })[0] : null;
    var html = '<div class="form-grid">' +
      field("Task Title", "title", "text", { required: true, value: t ? t.title : "", full: true }) +
      field("Description", "description", "textarea", { value: t ? t.description : "", full: true }) +
      field("Department", "department", "select", { required: true, value: t ? t.department : "", options: DEPARTMENTS }) +
      field("Priority", "priority", "select", { required: true, value: t ? t.priority : "Medium", options: PRIORITIES }) +
      field("Date", "date", "date", { required: true, value: t ? t.date : todayISO() }) +
      field("Deadline", "deadline", "date", { required: true, value: t ? t.deadline : addDaysISO(3) }) +
      field("Responsible Officer", "officer", "select", { required: true, value: t ? t.officer : "", options: OFFICERS }) +
      field("Status", "status", "select", { required: true, value: t ? t.status : "Pending", options: TASK_STATUS }) +
      "</div>" + modalFooter("Save Task");
    openModal((t ? "Edit" : "Add") + " Task", html, function (root) {
      bindModalSave(root, function () {
        if (!validateRequired(root, ["title", "department", "date", "deadline", "officer", "priority", "status"])) return;
        var d = readForm(root);
        d.kind = kind;
        if (t) {
          Object.assign(t, d);
        } else {
          d.id = uid("TSK");
          store.tasks.push(d);
        }
        saveStore(); closeModal(); rerender(); toast("Task saved", "success");
      });
    });
  }

  /* ============================================================
     GRIEVANCES
     ============================================================ */
  function renderGrievances() {
    var el = sectionEl("grievances");
    el.innerHTML = header("Public Grievances", "Register and track public grievances — fictional demonstration data") +
      noteBanner("All grievances are fictional demonstration data. This prototype is not connected to any real government grievance system.");

    var panel = document.createElement("div");
    panel.className = "panel";
    var head = document.createElement("div");
    head.className = "panel-head";
    head.innerHTML = "<h3>Grievance Register</h3>";
    var tw = document.createElement("div");
    tw.className = "toolbar";
    var search = searchBox(function () { draw(); });
    var depF = filterSelect(DEPARTMENTS, function () { draw(); }, "All Departments");
    var priF = filterSelect(PRIORITIES, function () { draw(); }, "All Priorities");
    var stF = filterSelect(GRIEV_STATUS, function () { draw(); }, "All Status");
    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary"; addBtn.textContent = "+ Add Grievance";
    var expBtn = document.createElement("button");
    expBtn.className = "btn"; expBtn.textContent = "Export CSV";
    tw.appendChild(search); tw.appendChild(depF); tw.appendChild(priF); tw.appendChild(stF);
    tw.appendChild(addBtn); tw.appendChild(expBtn);
    head.appendChild(tw);
    panel.appendChild(head);
    var body = document.createElement("div");
    body.className = "panel-body";
    panel.appendChild(body);
    el.appendChild(panel);

    function filtered() {
      var q = search.value.toLowerCase();
      return store.grievances.filter(function (g) {
        if (q && (g.id + g.subject + g.description + g.area + g.officer).toLowerCase().indexOf(q) < 0) return false;
        if (depF.value && g.department !== depF.value) return false;
        if (priF.value && g.priority !== priF.value) return false;
        if (stF.value && g.status !== stF.value) return false;
        return true;
      });
    }
    function draw() {
      var rows = filtered();
      if (!rows.length) { body.innerHTML = emptyState("No grievances match your filters."); return; }
      body.innerHTML = '<div class="table-wrap">' + grievTable(rows, true) + "</div>";
      $all("[data-edit]", body).forEach(function (b) { b.addEventListener("click", function () { grievForm(b.getAttribute("data-edit")); }); });
      $all("[data-del]", body).forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-del");
          confirmAction("Delete Grievance", "Delete this grievance record?", function () {
            store.grievances = store.grievances.filter(function (g) { return g.id !== id; });
            saveStore(); draw(); refreshDashboard(); toast("Grievance deleted", "success");
          });
        });
      });
    }
    addBtn.addEventListener("click", function () { grievForm(); });
    expBtn.addEventListener("click", function () {
      var rows = filtered();
      exportCSV("grievances.csv", ["ID", "Subject", "Department", "Area", "Date Received", "Priority", "Officer", "Deadline", "Status", "Action", "Resolution", "Date Closed"],
        rows.map(function (g) { return [g.id, g.subject, g.department, g.area, g.dateReceived, g.priority, g.officer, g.deadline, g.status, g.action, g.resolution, g.dateClosed]; }));
    });
    draw();
  }

  function grievTable(rows, withActions) {
    var html = '<table class="data"><thead><tr><th>ID</th><th>Subject</th><th>Department</th><th>Area</th><th>Received</th><th>Deadline</th><th>Priority</th><th>Officer</th><th>Status</th>' + (withActions ? "<th>Actions</th>" : "") + "</tr></thead><tbody>";
    rows.forEach(function (g) {
      var od = isOverdue(g.deadline, g.status);
      html += '<tr class="' + (od ? "row-overdue" : "") + '">' +
        '<td class="col-id">' + esc(g.id) + "</td>" +
        "<td><strong>" + esc(g.subject) + "</strong>" + (g.description ? '<div style="font-size:11px;color:var(--text-soft)">' + esc(g.description) + "</div>" : "") + "</td>" +
        "<td>" + esc(g.department) + "</td><td>" + esc(g.area) + "</td>" +
        "<td>" + fmtDate(g.dateReceived) + "</td>" +
        "<td>" + fmtDate(g.deadline) + (od ? ' <span class="badge urgent">Overdue</span>' : "") + "</td>" +
        "<td>" + priorityBadge(g.priority) + "</td>" +
        "<td>" + esc(g.officer) + "</td>" +
        "<td>" + badge(g.status) + "</td>" +
        (withActions ? '<td><button class="btn btn-sm" data-edit="' + g.id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + g.id + '">Delete</button></td>' : "") +
        "</tr>";
    });
    html += "</tbody></table>";
    return html;
  }

  function grievForm(id) {
    var g = id ? store.grievances.filter(function (x) { return x.id === id; })[0] : null;
    var html = '<div class="form-grid">' +
      field("Subject", "subject", "text", { required: true, value: g ? g.subject : "", full: true }) +
      field("Description", "description", "textarea", { value: g ? g.description : "", full: true }) +
      field("Department", "department", "select", { required: true, value: g ? g.department : "", options: DEPARTMENTS }) +
      field("Area / Locality", "area", "select", { required: true, value: g ? g.area : "", options: AREAS }) +
      field("Date Received", "dateReceived", "date", { required: true, value: g ? g.dateReceived : todayISO() }) +
      field("Priority", "priority", "select", { required: true, value: g ? g.priority : "Medium", options: PRIORITIES }) +
      field("Responsible Officer", "officer", "select", { required: true, value: g ? g.officer : "", options: OFFICERS }) +
      field("Deadline", "deadline", "date", { required: true, value: g ? g.deadline : addDaysISO(7) }) +
      field("Status", "status", "select", { required: true, value: g ? g.status : "Open", options: GRIEV_STATUS }) +
      field("Action Taken", "action", "textarea", { value: g ? g.action : "", full: true }) +
      field("Resolution Notes", "resolution", "textarea", { value: g ? g.resolution : "", full: true }) +
      field("Date Closed", "dateClosed", "date", { value: g ? g.dateClosed : "" }) +
      "</div>" + modalFooter("Save Grievance");
    openModal((g ? "Edit" : "Add") + " Grievance", html, function (root) {
      bindModalSave(root, function () {
        if (!validateRequired(root, ["subject", "department", "area", "dateReceived", "priority", "officer", "deadline", "status"])) return;
        var d = readForm(root);
        if (d.status !== "Closed" && d.status !== "Resolved") d.dateClosed = "";
        if (g) Object.assign(g, d);
        else { d.id = uid("GRV"); store.grievances.push(d); }
        saveStore(); closeModal(); rerender(); toast("Grievance saved", "success");
      });
    });
  }

  /* ============================================================
     PROJECTS
     ============================================================ */
  function renderProjects() {
    var el = sectionEl("projects");
    el.innerHTML = header("Development Projects", "Track district development works — fictional demonstration data");
    var panel = document.createElement("div");
    panel.className = "panel";
    var head = document.createElement("div");
    head.className = "panel-head";
    head.innerHTML = "<h3>Project Register</h3>";
    var tw = document.createElement("div");
    tw.className = "toolbar";
    var search = searchBox(function () { draw(); });
    var depF = filterSelect(DEPARTMENTS, function () { draw(); }, "All Departments");
    var stF = filterSelect(PROJ_STATUS, function () { draw(); }, "All Status");
    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary"; addBtn.textContent = "+ Add Project";
    var expBtn = document.createElement("button");
    expBtn.className = "btn"; expBtn.textContent = "Export CSV";
    tw.appendChild(search); tw.appendChild(depF); tw.appendChild(stF); tw.appendChild(addBtn); tw.appendChild(expBtn);
    head.appendChild(tw); panel.appendChild(head);
    var body = document.createElement("div");
    body.className = "panel-body";
    panel.appendChild(body); el.appendChild(panel);

    function filtered() {
      var q = search.value.toLowerCase();
      return store.projects.filter(function (p) {
        if (q && (p.id + p.name + p.location + p.officer).toLowerCase().indexOf(q) < 0) return false;
        if (depF.value && p.department !== depF.value) return false;
        if (stF.value && p.status !== stF.value) return false;
        return true;
      });
    }
    function draw() {
      var rows = filtered();
      if (!rows.length) { body.innerHTML = emptyState("No projects match your filters."); return; }
      body.innerHTML = '<div class="table-wrap">' + projectTable(rows, true) + "</div>";
      $all("[data-edit]", body).forEach(function (b) { b.addEventListener("click", function () { projectForm(b.getAttribute("data-edit")); }); });
      $all("[data-progress]", body).forEach(function (b) { b.addEventListener("click", function () { progressForm(b.getAttribute("data-progress")); }); });
      $all("[data-del]", body).forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-del");
          confirmAction("Delete Project", "Delete this project record?", function () {
            store.projects = store.projects.filter(function (p) { return p.id !== id; });
            saveStore(); draw(); refreshDashboard(); toast("Project deleted", "success");
          });
        });
      });
    }
    addBtn.addEventListener("click", function () { projectForm(); });
    expBtn.addEventListener("click", function () {
      var rows = filtered();
      exportCSV("projects.csv", ["ID", "Name", "Department", "Location", "Budget", "Start", "Target", "Progress", "Officer", "Status", "Remarks"],
        rows.map(function (p) { return [p.id, p.name, p.department, p.location, p.budget, p.startDate, p.targetDate, p.progress, p.officer, p.status, p.remarks]; }));
    });
    draw();
  }

  function projectTable(rows, withActions) {
    var html = '<table class="data"><thead><tr><th>ID</th><th>Project</th><th>Department</th><th>Location</th><th>Budget</th><th>Start</th><th>Target</th><th>Progress</th><th>Officer</th><th>Status</th>' + (withActions ? "<th>Actions</th>" : "") + "</tr></thead><tbody>";
    rows.forEach(function (p) {
      html += "<tr>" +
        '<td class="col-id">' + esc(p.id) + "</td>" +
        "<td><strong>" + esc(p.name) + "</strong>" + (p.remarks ? '<div style="font-size:11px;color:var(--text-soft)">' + esc(p.remarks) + "</div>" : "") + "</td>" +
        "<td>" + esc(p.department) + "</td><td>" + esc(p.location) + "</td>" +
        "<td>" + fmtINR(p.budget) + "</td>" +
        "<td>" + fmtDate(p.startDate) + "</td><td>" + fmtDate(p.targetDate) + "</td>" +
        '<td><div class="pbar ' + (p.progress >= 100 ? "high" : "") + '"><span style="width:' + (p.progress || 0) + '%"></span></div><div style="font-size:11px;margin-top:2px">' + (p.progress || 0) + "%</div></td>" +
        "<td>" + esc(p.officer) + "</td><td>" + badge(p.status) + "</td>" +
        (withActions ? '<td><button class="btn btn-sm" data-edit="' + p.id + '">Edit</button> <button class="btn btn-sm btn-gold" data-progress="' + p.id + '">Progress</button> <button class="btn btn-sm btn-danger" data-del="' + p.id + '">Delete</button></td>' : "") +
        "</tr>";
    });
    html += "</tbody></table>";
    return html;
  }

  function projectForm(id) {
    var p = id ? store.projects.filter(function (x) { return x.id === id; })[0] : null;
    var html = '<div class="form-grid">' +
      field("Project Name", "name", "text", { required: true, value: p ? p.name : "", full: true }) +
      field("Department", "department", "select", { required: true, value: p ? p.department : "", options: DEPARTMENTS }) +
      field("Location", "location", "select", { required: true, value: p ? p.location : "", options: AREAS }) +
      field("Estimated Budget (₹)", "budget", "number", { required: true, value: p ? p.budget : "", min: "0", step: "1000" }) +
      field("Start Date", "startDate", "date", { required: true, value: p ? p.startDate : todayISO() }) +
      field("Target Completion", "targetDate", "date", { required: true, value: p ? p.targetDate : addDaysISO(60) }) +
      field("Progress (%)", "progress", "number", { required: true, value: p ? p.progress : 0, min: "0", max: "100", step: "1" }) +
      field("Responsible Officer", "officer", "select", { required: true, value: p ? p.officer : "", options: OFFICERS }) +
      field("Status", "status", "select", { required: true, value: p ? p.status : "Planned", options: PROJ_STATUS }) +
      field("Remarks", "remarks", "textarea", { value: p ? p.remarks : "", full: true }) +
      "</div>" + modalFooter("Save Project");
    openModal((p ? "Edit" : "Add") + " Project", html, function (root) {
      bindModalSave(root, function () {
        if (!validateRequired(root, ["name", "department", "location", "budget", "startDate", "targetDate", "progress", "officer", "status"])) return;
        var d = readForm(root);
        d.progress = Math.max(0, Math.min(100, Number(d.progress) || 0));
        if (p) Object.assign(p, d);
        else { d.id = uid("PRJ"); store.projects.push(d); }
        saveStore(); closeModal(); rerender(); toast("Project saved", "success");
      });
    });
  }

  function progressForm(id) {
    var p = store.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var html = '<div class="form-grid">' +
      field("Project", "name", "text", { value: p.name, full: true }) +
      field("Progress (%)", "progress", "number", { required: true, value: p.progress, min: "0", max: "100", step: "1", full: true }) +
      field("Status", "status", "select", { value: p.status, options: PROJ_STATUS, full: true }) +
      field("Remarks", "remarks", "textarea", { value: p.remarks, full: true }) +
      "</div>" + modalFooter("Update Progress", "btn-gold");
    openModal("Update Progress — " + p.id, html, function (root) {
      $("#f_name").disabled = true;
      bindModalSave(root, function () {
        p.progress = Math.max(0, Math.min(100, Number($("#f_progress", root).value) || 0));
        p.status = $("#f_status", root).value;
        p.remarks = $("#f_remarks", root).value.trim();
        saveStore(); closeModal(); rerender(); toast("Progress updated", "success");
      });
    });
  }

  /* ============================================================
     MEETINGS
     ============================================================ */
  function renderMeetings() {
    var el = sectionEl("meetings");
    el.innerHTML = header("Meetings & Events", "Agenda manager for district meetings and official events");
    var panel = document.createElement("div");
    panel.className = "panel";
    var head = document.createElement("div");
    head.className = "panel-head";
    head.innerHTML = "<h3>Meetings & Events</h3>";
    var tw = document.createElement("div");
    tw.className = "toolbar";
    var search = searchBox(function () { draw(); });
    var typeF = filterSelect(MEETING_TYPES, function () { draw(); }, "All Types");
    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary"; addBtn.textContent = "+ Add Meeting";
    tw.appendChild(search); tw.appendChild(typeF); tw.appendChild(addBtn);
    head.appendChild(tw); panel.appendChild(head);
    var body = document.createElement("div");
    body.className = "panel-body";
    panel.appendChild(body); el.appendChild(panel);

    function filtered() {
      var q = search.value.toLowerCase();
      return store.meetings.filter(function (m) {
        if (q && (m.type + m.venue + m.agenda).toLowerCase().indexOf(q) < 0) return false;
        if (typeF.value && m.type !== typeF.value) return false;
        return true;
      }).sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
    }
    function draw() {
      var rows = filtered();
      if (!rows.length) { body.innerHTML = emptyState("No meetings match your filters."); return; }
      body.innerHTML = '<div class="table-wrap">' + meetingTable(rows, true) + "</div>";
      $all("[data-edit]", body).forEach(function (b) { b.addEventListener("click", function () { meetingForm(b.getAttribute("data-edit")); }); });
      $all("[data-del]", body).forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-del");
          confirmAction("Delete Meeting", "Delete this meeting record?", function () {
            store.meetings = store.meetings.filter(function (m) { return m.id !== id; });
            saveStore(); draw(); refreshDashboard(); toast("Meeting deleted", "success");
          });
        });
      });
    }
    addBtn.addEventListener("click", function () { meetingForm(); });
    draw();
  }

  function meetingTable(rows, withActions) {
    var html = '<table class="data"><thead><tr><th>ID</th><th>Type</th><th>Date</th><th>Time</th><th>Venue</th><th>Agenda</th><th>Departments</th><th>Action Points</th>' + (withActions ? "<th>Actions</th>" : "") + "</tr></thead><tbody>";
    rows.forEach(function (m) {
      var today = todayISO();
      var cls = m.date < today ? "row-overdue" : "";
      html += '<tr class="' + cls + '">' +
        '<td class="col-id">' + esc(m.id) + "</td>" +
        "<td>" + esc(m.type) + "</td>" +
        "<td>" + fmtDate(m.date) + "</td><td>" + esc(m.time || "—") + "</td>" +
        "<td>" + esc(m.venue) + "</td>" +
        "<td>" + esc(m.agenda) + "</td>" +
        "<td style='font-size:12px'>" + esc(m.departments) + "</td>" +
        "<td style='font-size:12px'>" + esc(m.actionPoints) + "</td>" +
        (withActions ? '<td><button class="btn btn-sm" data-edit="' + m.id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + m.id + '">Delete</button></td>' : "") +
        "</tr>";
    });
    html += "</tbody></table>";
    return html;
  }

  function meetingForm(id) {
    var m = id ? store.meetings.filter(function (x) { return x.id === id; })[0] : null;
    var html = '<div class="form-grid">' +
      field("Type", "type", "select", { required: true, value: m ? m.type : "", options: MEETING_TYPES }) +
      field("Date", "date", "date", { required: true, value: m ? m.date : todayISO() }) +
      field("Time", "time", "text", { required: true, value: m ? m.time : "10:00", hint: "24-hour format, e.g. 14:30" }) +
      field("Venue", "venue", "text", { required: true, value: m ? m.venue : "" }) +
      field("Agenda", "agenda", "textarea", { required: true, value: m ? m.agenda : "", full: true }) +
      field("Participating Departments", "departments", "textarea", { required: true, value: m ? m.departments : "", full: true, hint: "Comma separated" }) +
      field("Action Points", "actionPoints", "textarea", { value: m ? m.actionPoints : "", full: true }) +
      "</div>" + modalFooter("Save Meeting");
    openModal((m ? "Edit" : "Add") + " Meeting", html, function (root) {
      bindModalSave(root, function () {
        if (!validateRequired(root, ["type", "date", "time", "venue", "agenda", "departments"])) return;
        var d = readForm(root);
        if (m) Object.assign(m, d);
        else { d.id = uid("MTG"); store.meetings.push(d); }
        saveStore(); closeModal(); rerender(); toast("Meeting saved", "success");
      });
    });
  }

  /* ============================================================
     DOCUMENTS
     ============================================================ */
  function renderDocuments() {
    var el = sectionEl("documents");
    el.innerHTML = header("Document Register", "Register and track official documents — fictional demonstration data") +
      noteBanner("Local browser storage does not provide secure document management. Do not store confidential documents. File names are recorded only as a reference — files are NOT uploaded to any server.", "info");
    var panel = document.createElement("div");
    panel.className = "panel";
    var head = document.createElement("div");
    head.className = "panel-head";
    head.innerHTML = "<h3>Document Register</h3>";
    var tw = document.createElement("div");
    tw.className = "toolbar";
    var search = searchBox(function () { draw(); });
    var catF = filterSelect(DOC_CATEGORIES, function () { draw(); }, "All Categories");
    var stF = filterSelect(DOC_STATUS, function () { draw(); }, "All Status");
    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary"; addBtn.textContent = "+ Add Document";
    tw.appendChild(search); tw.appendChild(catF); tw.appendChild(stF); tw.appendChild(addBtn);
    head.appendChild(tw); panel.appendChild(head);
    var body = document.createElement("div");
    body.className = "panel-body";
    panel.appendChild(body); el.appendChild(panel);

    function filtered() {
      var q = search.value.toLowerCase();
      return store.documents.filter(function (d) {
        if (q && (d.id + d.title + d.refNo + d.notes).toLowerCase().indexOf(q) < 0) return false;
        if (catF.value && d.category !== catF.value) return false;
        if (stF.value && d.status !== stF.value) return false;
        return true;
      });
    }
    function draw() {
      var rows = filtered();
      if (!rows.length) { body.innerHTML = emptyState("No documents match your filters."); return; }
      var html = '<div class="table-wrap"><table class="data"><thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Department</th><th>Received</th><th>Ref No.</th><th>Related ID</th><th>Status</th><th>File</th><th>Actions</th></tr></thead><tbody>';
      rows.forEach(function (d) {
        html += "<tr>" +
          '<td class="col-id">' + esc(d.id) + "</td>" +
          "<td><strong>" + esc(d.title) + "</strong>" + (d.notes ? '<div style="font-size:11px;color:var(--text-soft)">' + esc(d.notes) + "</div>" : "") + "</td>" +
          "<td>" + esc(d.category) + "</td><td>" + esc(d.department) + "</td>" +
          "<td>" + fmtDate(d.dateReceived) + "</td>" +
          "<td>" + esc(d.refNo) + "</td><td>" + esc(d.related || "—") + "</td>" +
          "<td>" + badge(d.status) + "</td>" +
          "<td>" + (d.fileName ? '<span style="font-size:12px">📎 ' + esc(d.fileName) + "</span>" : "—") + "</td>" +
          '<td><button class="btn btn-sm" data-edit="' + d.id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + d.id + '">Delete</button></td>' +
          "</tr>";
      });
      html += "</tbody></table></div>";
      body.innerHTML = html;
      $all("[data-edit]", body).forEach(function (b) { b.addEventListener("click", function () { docForm(b.getAttribute("data-edit")); }); });
      $all("[data-del]", body).forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-del");
          confirmAction("Delete Document", "Delete this document record?", function () {
            store.documents = store.documents.filter(function (d) { return d.id !== id; });
            saveStore(); draw(); toast("Document deleted", "success");
          });
        });
      });
    }
    addBtn.addEventListener("click", function () { docForm(); });
    draw();
  }

  function docForm(id) {
    var d = id ? store.documents.filter(function (x) { return x.id === id; })[0] : null;
    var html = '<div class="form-grid">' +
      field("Document Title", "title", "text", { required: true, value: d ? d.title : "", full: true }) +
      field("Category", "category", "select", { required: true, value: d ? d.category : "", options: DOC_CATEGORIES }) +
      field("Department", "department", "select", { required: true, value: d ? d.department : "", options: DEPARTMENTS }) +
      field("Date Received", "dateReceived", "date", { required: true, value: d ? d.dateReceived : todayISO() }) +
      field("Reference Number", "refNo", "text", { required: true, value: d ? d.refNo : "" }) +
      field("Related Grievance / Project ID", "related", "text", { value: d ? d.related : "", hint: "Optional, e.g. GRV-XXXX or PRJ-XXXX" }) +
      field("Status", "status", "select", { required: true, value: d ? d.status : "Received", options: DOC_STATUS }) +
      field("File Reference (name only)", "fileName", "text", { value: d ? d.fileName : "", full: true, hint: "Enter file name only. File is NOT uploaded — this is a local reference." }) +
      field("Notes", "notes", "textarea", { value: d ? d.notes : "", full: true }) +
      "</div>" + modalFooter("Save Document");
    openModal((d ? "Edit" : "Add") + " Document", html, function (root) {
      bindModalSave(root, function () {
        if (!validateRequired(root, ["title", "category", "department", "dateReceived", "refNo", "status"])) return;
        var data = readForm(root);
        if (d) Object.assign(d, data);
        else { data.id = uid("DOC"); store.documents.push(data); }
        saveStore(); closeModal(); rerender(); toast("Document saved", "success");
      });
    });
  }

  /* ============================================================
     DEPARTMENTS
     ============================================================ */
  function renderDepartments() {
    var el = sectionEl("departments");
    el.innerHTML = header("Department Tracker", "Department-wise view of tasks, projects and overdue actions");
    var grid = document.createElement("div");
    grid.className = "dept-grid";
    DEPARTMENTS.forEach(function (dep) {
      var tasks = store.tasks.filter(function (t) { return t.department === dep; });
      var proj = store.projects.filter(function (p) { return p.department === dep; });
      var pending = tasks.filter(function (t) { return t.status !== "Completed"; }).length;
      var completed = tasks.filter(function (t) { return t.status === "Completed"; }).length;
      var overdue = tasks.filter(function (t) { return isOverdue(t.deadline, t.status); }).length;
      var activeProj = proj.filter(function (p) { return p.status === "In Progress"; }).length;
      var card = document.createElement("div");
      card.className = "dept-card";
      card.innerHTML = "<h4>" + esc(dep) + "</h4>" +
        '<div class="dept-sub">' + tasks.length + " tasks · " + proj.length + " projects</div>" +
        '<div class="dept-stats">' +
        '<div class="dept-stat warn"><div class="n">' + pending + '</div><div class="l">Pending</div></div>' +
        '<div class="dept-stat ok"><div class="n">' + completed + '</div><div class="l">Done</div></div>' +
        '<div class="dept-stat danger"><div class="n">' + overdue + '</div><div class="l">Overdue</div></div>' +
        '<div class="dept-stat"><div class="n">' + activeProj + '</div><div class="l">Projects</div></div>' +
        "</div>" +
        (tasks.filter(function (t) { return t.status !== "Completed"; }).slice(0, 4).length ?
          '<div style="font-size:12px"><strong>Open tasks:</strong><ul style="margin:4px 0 0 18px;padding:0">' +
          tasks.filter(function (t) { return t.status !== "Completed"; }).slice(0, 4).map(function (t) {
            return "<li>" + esc(t.title) + " — " + badge(t.status) + (isOverdue(t.deadline, t.status) ? ' <span class="badge urgent">Overdue</span>' : "") + "</li>";
          }).join("") + "</ul></div>" : '<div style="font-size:12px;color:var(--text-soft)">No open tasks.</div>');
      grid.appendChild(card);
    });
    el.appendChild(grid);
  }

  /* ============================================================
     LAW & ORDER
     ============================================================ */
  function renderLawOrder() {
    var el = sectionEl("laworder");
    el.innerHTML = header("Law & Order Coordination", "Non-sensitive administrative coordination — fictional demonstration data") +
      noteBanner("This register contains only non-sensitive administrative coordination. No confidential police case files, personal information or intelligence reports.", "info");
    var panel = document.createElement("div");
    panel.className = "panel";
    var head = document.createElement("div");
    head.className = "panel-head";
    head.innerHTML = "<h3>Coordination Register</h3>";
    var tw = document.createElement("div");
    tw.className = "toolbar";
    var search = searchBox(function () { draw(); });
    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary"; addBtn.textContent = "+ Add Record";
    tw.appendChild(search); tw.appendChild(addBtn);
    head.appendChild(tw); panel.appendChild(head);
    var body = document.createElement("div");
    body.className = "panel-body";
    panel.appendChild(body); el.appendChild(panel);

    function draw() {
      var q = search.value.toLowerCase();
      var rows = store.lawOrder.filter(function (r) { return !q || (r.event + r.venue + r.type + r.officer).toLowerCase().indexOf(q) >= 0; });
      if (!rows.length) { body.innerHTML = emptyState("No coordination records found."); return; }
      var html = '<div class="table-wrap"><table class="data"><thead><tr><th>ID</th><th>Event</th><th>Type</th><th>Date</th><th>Venue</th><th>Departments</th><th>Officer</th><th>Status</th><th>Notes</th><th>Actions</th></tr></thead><tbody>';
      rows.forEach(function (r) {
        html += "<tr>" +
          '<td class="col-id">' + esc(r.id) + "</td>" +
          "<td><strong>" + esc(r.event) + "</strong></td>" +
          "<td>" + esc(r.type) + "</td><td>" + fmtDate(r.date) + "</td>" +
          "<td>" + esc(r.venue) + "</td>" +
          "<td style='font-size:12px'>" + esc(r.departments) + "</td>" +
          "<td>" + esc(r.officer) + "</td>" +
          "<td>" + badge(r.status) + "</td>" +
          "<td style='font-size:12px'>" + esc(r.notes) + "</td>" +
          '<td><button class="btn btn-sm" data-edit="' + r.id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + r.id + '">Delete</button></td>' +
          "</tr>";
      });
      html += "</tbody></table></div>";
      body.innerHTML = html;
      $all("[data-edit]", body).forEach(function (b) { b.addEventListener("click", function () { lawForm(b.getAttribute("data-edit")); }); });
      $all("[data-del]", body).forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-del");
          confirmAction("Delete Record", "Delete this coordination record?", function () {
            store.lawOrder = store.lawOrder.filter(function (r) { return r.id !== id; });
            saveStore(); draw(); toast("Record deleted", "success");
          });
        });
      });
    }
    addBtn.addEventListener("click", function () { lawForm(); });
    draw();
  }

  function lawForm(id) {
    var r = id ? store.lawOrder.filter(function (x) { return x.id === id; })[0] : null;
    var types = ["Crowd Management", "Traffic Arrangement", "Public Event", "Emergency Coordination", "Official Follow-up"];
    var statusOpts = ["Pending", "In Progress", "Completed", "On Hold"];
    var html = '<div class="form-grid">' +
      field("Event", "event", "text", { required: true, value: r ? r.event : "", full: true }) +
      field("Type", "type", "select", { required: true, value: r ? r.type : "", options: types }) +
      field("Date", "date", "date", { required: true, value: r ? r.date : todayISO() }) +
      field("Venue", "venue", "text", { required: true, value: r ? r.venue : "" }) +
      field("Departments", "departments", "textarea", { required: true, value: r ? r.departments : "", full: true, hint: "Comma separated" }) +
      field("Officer", "officer", "select", { required: true, value: r ? r.officer : "", options: OFFICERS }) +
      field("Status", "status", "select", { required: true, value: r ? r.status : "Pending", options: statusOpts }) +
      field("Notes", "notes", "textarea", { value: r ? r.notes : "", full: true }) +
      "</div>" + modalFooter("Save Record");
    openModal((r ? "Edit" : "Add") + " Coordination Record", html, function (root) {
      bindModalSave(root, function () {
        if (!validateRequired(root, ["event", "type", "date", "venue", "departments", "officer", "status"])) return;
        var d = readForm(root);
        if (r) Object.assign(r, d);
        else { d.id = uid("LAW"); store.lawOrder.push(d); }
        saveStore(); closeModal(); rerender(); toast("Record saved", "success");
      });
    });
  }

  /* ============================================================
     VIP VISITS
     ============================================================ */
  function renderVisits() {
    var el = sectionEl("visits");
    el.innerHTML = header("VIP & Official Visits", "Plan and prepare for official visits — fictional demonstration data");
    var panel = document.createElement("div");
    panel.className = "panel";
    var head = document.createElement("div");
    head.className = "panel-head";
    head.innerHTML = "<h3>Visit Planner</h3>";
    var tw = document.createElement("div");
    tw.className = "toolbar";
    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary"; addBtn.textContent = "+ Add Visit";
    tw.appendChild(addBtn);
    head.appendChild(tw); panel.appendChild(head);
    var body = document.createElement("div");
    body.className = "panel-body";
    panel.appendChild(body); el.appendChild(panel);

    function draw() {
      var rows = store.visits.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
      if (!rows.length) { body.innerHTML = emptyState("No visits scheduled."); return; }
      var html = '<div class="table-wrap"><table class="data"><thead><tr><th>ID</th><th>Visitor</th><th>Designation</th><th>Purpose</th><th>Date</th><th>Time</th><th>Venue</th><th>Department</th><th>Checklist</th><th>Actions</th></tr></thead><tbody>';
      rows.forEach(function (v) {
        var done = v.checklist.filter(function (c) { return c.done; }).length;
        html += "<tr>" +
          '<td class="col-id">' + esc(v.id) + "</td>" +
          "<td><strong>" + esc(v.visitor) + "</strong></td>" +
          "<td>" + esc(v.designation) + "</td>" +
          "<td>" + esc(v.purpose) + "</td>" +
          "<td>" + fmtDate(v.date) + "</td><td>" + esc(v.time) + "</td>" +
          "<td>" + esc(v.venue) + "</td>" +
          "<td>" + esc(v.department) + "</td>" +
          "<td><span class='badge " + (done === v.checklist.length ? "completed" : "pending") + "'>" + done + "/" + v.checklist.length + "</span></td>" +
          '<td><button class="btn btn-sm" data-edit="' + v.id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + v.id + '">Delete</button></td>' +
          "</tr>";
      });
      html += "</tbody></table></div>";
      body.innerHTML = html;
      $all("[data-edit]", body).forEach(function (b) { b.addEventListener("click", function () { visitForm(b.getAttribute("data-edit")); }); });
      $all("[data-del]", body).forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-del");
          confirmAction("Delete Visit", "Delete this visit record?", function () {
            store.visits = store.visits.filter(function (v) { return v.id !== id; });
            saveStore(); draw(); toast("Visit deleted", "success");
          });
        });
      });
    }
    addBtn.addEventListener("click", function () { visitForm(); });
    draw();
  }

  function visitForm(id) {
    var v = id ? store.visits.filter(function (x) { return x.id === id; })[0] : null;
    var checklistItems = v ? v.checklist : [];
    var checklistStr = checklistItems.map(function (c) { return typeof c === "string" ? c : c.text; }).join("\n");
    var html = '<div class="form-grid">' +
      field("Visitor Name", "visitor", "text", { required: true, value: v ? v.visitor : "", full: true }) +
      field("Designation", "designation", "text", { required: true, value: v ? v.designation : "" }) +
      field("Purpose", "purpose", "text", { required: true, value: v ? v.purpose : "", full: true }) +
      field("Date", "date", "date", { required: true, value: v ? v.date : todayISO() }) +
      field("Time", "time", "text", { required: true, value: v ? v.time : "10:00" }) +
      field("Venue", "venue", "text", { required: true, value: v ? v.venue : "" }) +
      field("Coordinating Department", "department", "select", { required: true, value: v ? v.department : "", options: DEPARTMENTS }) +
      field("Preparation Checklist (one per line)", "checklist", "textarea", { value: checklistStr, full: true, hint: "Each line becomes a checklist item" }) +
      "</div>" + modalFooter("Save Visit");
    openModal((v ? "Edit" : "Add") + " Visit", html, function (root) {
      bindModalSave(root, function () {
        if (!validateRequired(root, ["visitor", "designation", "purpose", "date", "time", "venue", "department"])) return;
        var d = readForm(root);
        d.checklist = (d.checklist || "").split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
        if (v) Object.assign(v, d);
        else { d.id = uid("VIS"); store.visits.push(d); }
        saveStore(); closeModal(); rerender(); toast("Visit saved", "success");
      });
    });
  }

  /* ============================================================
     DISASTER MANAGEMENT
     ============================================================ */
  function renderDisaster() {
    var el = sectionEl("disaster");
    el.innerHTML = header("Disaster Management", "Preparedness, resources and coordination — demonstration data") +
      noteBanner("All alerts and resource figures are demonstration data. Not a live emergency system.", "danger");
    var panel = document.createElement("div");
    panel.className = "panel";
    var head = document.createElement("div");
    head.className = "panel-head";
    head.innerHTML = "<h3>Preparedness & Coordination</h3>";
    var tw = document.createElement("div");
    tw.className = "toolbar";
    var addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary"; addBtn.textContent = "+ Add Activity";
    tw.appendChild(addBtn);
    head.appendChild(tw); panel.appendChild(head);
    var body = document.createElement("div");
    body.className = "panel-body";
    panel.appendChild(body); el.appendChild(panel);

    function draw() {
      var rows = store.disaster.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
      if (!rows.length) { body.innerHTML = emptyState("No disaster management records."); return; }
      var html = '<div class="table-wrap"><table class="data"><thead><tr><th>ID</th><th>Activity</th><th>Date</th><th>Area</th><th>Resources</th><th>Departments</th><th>Officer</th><th>Status</th><th>Notes</th><th>Actions</th></tr></thead><tbody>';
      rows.forEach(function (r) {
        html += "<tr>" +
          '<td class="col-id">' + esc(r.id) + "</td>" +
          "<td><strong>" + esc(r.activity) + "</strong></td>" +
          "<td>" + fmtDate(r.date) + "</td>" +
          "<td>" + esc(r.area) + "</td>" +
          "<td style='font-size:12px'>" + esc(r.resources) + "</td>" +
          "<td style='font-size:12px'>" + esc(r.departments) + "</td>" +
          "<td>" + esc(r.officer) + "</td>" +
          "<td>" + badge(r.status) + "</td>" +
          "<td style='font-size:12px'>" + esc(r.notes) + "</td>" +
          '<td><button class="btn btn-sm" data-edit="' + r.id + '">Edit</button> <button class="btn btn-sm btn-danger" data-del="' + r.id + '">Delete</button></td>' +
          "</tr>";
      });
      html += "</tbody></table></div>";
      body.innerHTML = html;
      $all("[data-edit]", body).forEach(function (b) { b.addEventListener("click", function () { disasterForm(b.getAttribute("data-edit")); }); });
      $all("[data-del]", body).forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-del");
          confirmAction("Delete Activity", "Delete this disaster management record?", function () {
            store.disaster = store.disaster.filter(function (r) { return r.id !== id; });
            saveStore(); draw(); toast("Record deleted", "success");
          });
        });
      });
    }
    addBtn.addEventListener("click", function () { disasterForm(); });
    draw();
  }

  function disasterForm(id) {
    var r = id ? store.disaster.filter(function (x) { return x.id === id; })[0] : null;
    var statusOpts = ["Pending", "In Progress", "Completed", "On Hold"];
    var html = '<div class="form-grid">' +
      field("Activity", "activity", "text", { required: true, value: r ? r.activity : "", full: true }) +
      field("Date", "date", "date", { required: true, value: r ? r.date : todayISO() }) +
      field("Area", "area", "select", { required: true, value: r ? r.area : "", options: AREAS }) +
      field("Resources Positioned", "resources", "textarea", { required: true, value: r ? r.resources : "", full: true }) +
      field("Departments", "departments", "textarea", { required: true, value: r ? r.departments : "", full: true, hint: "Comma separated" }) +
      field("Officer", "officer", "select", { required: true, value: r ? r.officer : "", options: OFFICERS }) +
      field("Status", "status", "select", { required: true, value: r ? r.status : "Pending", options: statusOpts }) +
      field("Notes", "notes", "textarea", { value: r ? r.notes : "", full: true }) +
      "</div>" + modalFooter("Save Activity");
    openModal((r ? "Edit" : "Add") + " Preparedness Activity", html, function (root) {
      bindModalSave(root, function () {
        if (!validateRequired(root, ["activity", "date", "area", "resources", "departments", "officer", "status"])) return;
        var d = readForm(root);
        if (r) Object.assign(r, d);
        else { d.id = uid("DSR"); store.disaster.push(d); }
        saveStore(); closeModal(); rerender(); toast("Activity saved", "success");
      });
    });
  }

  /* ============================================================
     REPORTS
     ============================================================ */
  function renderReports() {
    var el = sectionEl("reports");
    el.innerHTML = header("Reports", "Summary charts and exportable reports — demonstration data");

    var grvByStatus = countBy(store.grievances, "status");
    var tasksByDept = countBy(store.tasks, "department");
    var projByStatus = countBy(store.projects, "status");
    var overdueTasks = store.tasks.filter(function (t) { return isOverdue(t.deadline, t.status); });
    var meetingsCompleted = store.meetings.filter(function (m) { return m.date < todayISO(); }).length;
    var monthCompletion = monthCompletions();

    var maxGrv = Math.max(1, Math.max.apply(0, Object.keys(grvByStatus).map(function (k) { return grvByStatus[k]; })));
    var maxDep = Math.max(1, Math.max.apply(0, Object.keys(tasksByDept).map(function (k) { return tasksByDept[k]; })));
    var maxProj = Math.max(1, Math.max.apply(0, Object.keys(projByStatus).map(function (k) { return projByStatus[k]; })));
    var maxMonth = Math.max(1, Math.max.apply(0, monthCompletion.map(function (m) { return m.count; })));

    var html = '<div class="report-grid">' +
      chartPanel("Grievances by Status", barChart(grvByStatus, maxGrv, "navy")) +
      chartPanel("Tasks by Department", barChart(tasksByDept, maxDep, "gold")) +
      chartPanel("Projects by Status", barChart(projByStatus, maxProj, "green")) +
      chartPanel("Monthly Task Completion", monthChart(monthCompletion, maxMonth)) +
      '<div class="panel"><div class="panel-head"><h3>Overdue Action Items (' + overdueTasks.length + ')</h3></div><div class="panel-body"><div class="table-wrap">' +
      (overdueTasks.length ? taskTableSimple(overdueTasks) : emptyState("No overdue tasks.")) + "</div></div></div>" +
      '<div class="panel"><div class="panel-head"><h3>Meetings Completed</h3></div><div class="panel-body"><div class="stat-card ok" style="border:none;box-shadow:none"><div class="label">Meetings held before today</div><div class="value">' + meetingsCompleted + '</div></div></div></div>' +
      "</div>";

    var exportBar = document.createElement("div");
    exportBar.className = "section-actions";
    exportBar.style.marginBottom = "14px";
    var btnG = mkBtn("Export Grievances CSV", "btn", function () {
      exportCSV("grievances.csv", ["ID", "Subject", "Department", "Status", "Priority", "Deadline"],
        store.grievances.map(function (g) { return [g.id, g.subject, g.department, g.status, g.priority, g.deadline]; }));
    });
    var btnP = mkBtn("Export Projects CSV", "btn", function () {
      exportCSV("projects.csv", ["ID", "Name", "Department", "Status", "Progress"],
        store.projects.map(function (p) { return [p.id, p.name, p.department, p.status, p.progress]; }));
    });
    var btnT = mkBtn("Export Tasks CSV", "btn", function () {
      exportCSV("tasks.csv", ["ID", "Title", "Department", "Status", "Priority", "Deadline", "Officer"],
        store.tasks.map(function (t) { return [t.id, t.title, t.department, t.status, t.priority, t.deadline, t.officer]; }));
    });
    exportBar.appendChild(btnT); exportBar.appendChild(btnG); exportBar.appendChild(btnP);

    el.innerHTML = header("Reports", "Summary charts and CSV exports — demonstration data");
    el.appendChild(exportBar);
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    el.appendChild(wrap);
  }

  function mkBtn(label, cls, onClick) {
    var b = document.createElement("button");
    b.className = cls; b.textContent = label;
    b.addEventListener("click", onClick);
    return b;
  }

  function countBy(arr, key) {
    var m = {};
    arr.forEach(function (x) { m[x[key]] = (m[x[key]] || 0) + 1; });
    return m;
  }
  function monthCompletions() {
    var now = new Date();
    var out = [];
    for (var i = 5; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      var key = d.toISOString().slice(0, 7);
      var label = d.toLocaleDateString("en-IN", { month: "short" });
      var count = store.tasks.filter(function (t) { return t.status === "Completed" && t.date && t.date.slice(0, 7) === key; }).length;
      out.push({ label: label, count: count });
    }
    return out;
  }

  function chartPanel(title, inner) {
    return '<div class="panel"><div class="panel-head"><h3>' + esc(title) + '</h3></div><div class="panel-body">' + inner + "</div></div>";
  }
  function barChart(data, max, colorClass) {
    var html = '<div class="bar-chart">';
    Object.keys(data).forEach(function (k) {
      var v = data[k];
      html += '<div class="bar-row"><span>' + esc(k) + '</span><div class="bar-track"><span class="bar-fill ' + colorClass + '" style="width:' + (v / max * 100) + '%"></span></div><span>' + v + "</span></div>";
    });
    html += "</div>";
    return html;
  }
  function monthChart(data, max) {
    var html = '<div class="bar-chart">';
    data.forEach(function (m) {
      html += '<div class="bar-row"><span>' + esc(m.label) + '</span><div class="bar-track"><span class="bar-fill green" style="width:' + (m.count / max * 100) + '%"></span></div><span>' + m.count + "</span></div>";
    });
    html += "</div>";
    return html;
  }
  function taskTableSimple(rows) {
    var html = '<table class="data"><thead><tr><th>ID</th><th>Title</th><th>Department</th><th>Deadline</th><th>Status</th></tr></thead><tbody>';
    rows.forEach(function (t) {
      html += '<tr class="row-overdue"><td class="col-id">' + esc(t.id) + "</td><td>" + esc(t.title) + "</td><td>" + esc(t.department) + "</td><td>" + fmtDate(t.deadline) + "</td><td>" + badge(t.status) + "</td></tr>";
    });
    html += "</tbody></table>";
    return html;
  }

  /* ============================================================
     SETTINGS
     ============================================================ */
  function renderSettings() {
    var el = sectionEl("settings");
    el.innerHTML = header("Settings", "Application data and preferences");
    var body = document.createElement("div");
    body.className = "panel";
    body.innerHTML = '<div class="panel-head"><h3>Data Management</h3></div><div class="panel-body">' +
      "<p style='font-size:13px;color:var(--text-muted)'>All data is stored locally in your browser (LocalStorage). No data leaves this device. No backend or cloud service is used.</p>" +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">' +
      '<button class="btn btn-danger" id="resetAll">Reset all data to demonstration seed</button>' +
      '<button class="btn" id="clearAll">Clear all records (empty state)</button>' +
      '<button class="btn" id="exportAll">Export all tasks (CSV)</button>' +
      "</div>" +
      '<div class="panel-head" style="margin:20px -16px 0;border-top:1px solid var(--border);padding-top:14px"><h3>About</h3></div>' +
      '<dl class="kv" style="margin-top:10px">' +
      "<dt>Application</dt><dd>DISTRICT ADMIN — Tamil Nadu Collectorate Dashboard</dd>" +
      "<dt>Default District</dt><dd>" + esc($("#districtSelect").value) + "</dd>" +
      "<dt>Version</dt><dd>1.0 (prototype)</dd>" +
      "<dt>Storage</dt><dd>Browser LocalStorage</dd>" +
      "<dt>Status</dt><dd>Independent demonstration prototype. Not an official Government of Tamil Nadu application.</dd>" +
      "</dl></div>";
    el.appendChild(body);

    $("#resetAll", body).addEventListener("click", function () {
      confirmAction("Reset All Data", "This will replace ALL records with the original demonstration data. Continue?", function () {
        store = seedData(); saveStore(); rerender(); toast("Data reset to demonstration seed", "success");
      });
    });
    $("#clearAll", body).addEventListener("click", function () {
      confirmAction("Clear All Records", "This will remove ALL records. Continue?", function () {
        store = { tasks: [], grievances: [], projects: [], meetings: [], documents: [], lawOrder: [], visits: [], disaster: [] };
        saveStore(); rerender(); toast("All records cleared", "success");
      });
    });
    $("#exportAll", body).addEventListener("click", function () {
      exportCSV("all_tasks.csv", ["ID", "Title", "Department", "Date", "Deadline", "Priority", "Officer", "Status", "Kind"],
        store.tasks.map(function (t) { return [t.id, t.title, t.department, t.date, t.deadline, t.priority, t.officer, t.status, t.kind]; }));
    });
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  var renderers = {
    dashboard: renderDashboard,
    daily: function () { renderPlanner("daily", "Daily Planner", "Plan and track tasks for today"); },
    weekly: function () { renderPlanner("weekly", "Weekly Planner", "Plan tasks for the current week"); },
    monthly: function () { renderPlanner("monthly", "Monthly Planner", "Plan tasks for the current month"); },
    grievances: renderGrievances,
    projects: renderProjects,
    meetings: renderMeetings,
    documents: renderDocuments,
    departments: renderDepartments,
    laworder: renderLawOrder,
    visits: renderVisits,
    disaster: renderDisaster,
    reports: renderReports,
    settings: renderSettings
  };

  function navigate(section) {
    $all(".nav-item").forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-section") === section); });
    $all(".section").forEach(function (s) { s.classList.remove("active"); });
    (renderers[section] || renderDashboard)();
    $("#" + section + "-section").classList.add("active");
    if (window.innerWidth < 761) $("#sidebar").classList.add("collapsed");
    window.scrollTo(0, 0);
  }

  function rerender() {
    var active = $(".nav-item.active");
    var section = active ? active.getAttribute("data-section") : "dashboard";
    (renderers[section] || renderDashboard)();
  }
  function refreshDashboard() {
    if ($(".nav-item.active") && $(".nav-item.active").getAttribute("data-section") === "dashboard") renderDashboard();
  }

  /* ---------- Init ---------- */
  function init() {
    $("#sidebarToggle").addEventListener("click", function () { $("#sidebar").classList.toggle("collapsed"); });
    $("#modalClose").addEventListener("click", closeModal);
    $("#modalOverlay").addEventListener("click", function (e) { if (e.target === this) closeModal(); });
    $("#confirmCancel").addEventListener("click", closeConfirm);
    $("#confirmOk").addEventListener("click", function () { if (confirmCb) confirmCb(); closeConfirm(); });
    $("#confirmOverlay").addEventListener("click", function (e) { if (e.target === this) closeConfirm(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeModal(); closeConfirm(); }
    });

    $all(".nav-item").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        navigate(a.getAttribute("data-section"));
      });
    });

    $("#districtSelect").addEventListener("change", function () {
      toast("District set to " + this.value + " (demonstration)", "success");
      refreshDashboard();
    });

    if (window.innerWidth < 761) $("#sidebar").classList.add("collapsed");
    navigate("dashboard");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
