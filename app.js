window.addEventListener("DOMContentLoaded", function () {
    const { HashRouter, Route, Link, Switch, useHistory } = window.ReactRouterDOM;
  
    function Sidebar() {
      return React.createElement("div", { className: "sidebar" }, [
        React.createElement("h2", {}, "商家管理"),
        React.createElement("nav", {}, [
          React.createElement(Link, { to: "/revenue" }, "營收統計"),
          React.createElement(Link, { to: "/sales" }, "銷售趨勢"),
          React.createElement(Link, { to: "/members" }, "會員管理"),
          React.createElement(Link, { to: "/products" }, "商品管理"),
          React.createElement(Link, { to: "/orders" }, "訂單管理"),
          React.createElement(Link, { to: "/promotions" }, "促銷活動"),
          React.createElement(Link, { to: "/export" }, "報表匯出")
        ]),
      ]);
    }
  
    function Page({ title, children }) {
      return React.createElement(
        "div",
        { className: "main" },
        React.createElement("h1", {}, title),
        children
      );
    }
  
    function RevenuePage() {
      React.useEffect(() => {
        new Chart(document.getElementById("revenueChart"), {
          type: "bar",
          data: {
            labels: ["週一", "週二", "週三", "週四", "週五", "週六", "週日"],
            datasets: [
              {
                label: "每日營收 (元)",
                backgroundColor: "#f9c066",
                data: [3000, 5000, 4000, 7000, 8000, 6500, 6000],
              },
            ],
          },
          options: { responsive: true },
        });
      }, []);
  
      return React.createElement(Page, { title: "營收統計" }, [
        React.createElement("div", { className: "chart-container" }, [
          React.createElement("canvas", { id: "revenueChart" }),
        ]),
      ]);
    }
  
    function SalesPage() {
      React.useEffect(() => {
        new Chart(document.getElementById("salesTrend"), {
          type: "line",
          data: {
            labels: ["1月", "2月", "3月", "4月", "5月"],
            datasets: [
              {
                label: "銷售額 (萬)",
                borderColor: "#f58322",
                backgroundColor: "#fcd2ac",
                data: [12, 19, 15, 20, 25],
                fill: true,
                tension: 0.3,
              },
            ],
          },
        });
      }, []);
  
      return React.createElement(Page, { title: "銷售趨勢" }, [
        React.createElement("div", { className: "chart-container" }, [
          React.createElement("canvas", { id: "salesTrend" }),
        ]),
        React.createElement("h2", {}, "熱門商品前五名"),
        React.createElement("ul", {}, [
          "奶油可頌",
          "蜂蜜吐司",
          "巧克力貝果",
          "葡萄乾麵包",
          "鹽可頌",
        ].map(item => React.createElement("li", {}, "⭐ " + item))),
      ]);
    }
  
    function MembersPage() {
      const members = [
        { name: "王小明", email: "ming@mail.com", vip: true },
        { name: "李小花", email: "hua@mail.com", vip: false },
        { name: "陳阿姨", email: "auntie@mail.com", vip: true },
      ];
  
      return React.createElement(Page, { title: "會員管理" }, [
        React.createElement("div", { className: "search-box" }, [
          React.createElement("input", {
            type: "text",
            placeholder: "搜尋會員（模擬）",
          }),
        ]),
        React.createElement("table", {}, [
          React.createElement("thead", {}, [
            React.createElement("tr", {}, [
              React.createElement("th", {}, "姓名"),
              React.createElement("th", {}, "信箱"),
              React.createElement("th", {}, "身分"),
              React.createElement("th", {}, "操作"),
            ]),
          ]),
          React.createElement("tbody", {}, members.map((m, i) =>
            React.createElement("tr", { key: i }, [
              React.createElement("td", {}, m.name),
              React.createElement("td", {}, m.email),
              React.createElement("td", {}, m.vip ? "VIP" : "一般"),
              React.createElement("td", {}, [
                React.createElement("button", { className: "btn" }, "查看"),
                React.createElement("button", { className: "btn" }, "編輯"),
              ]),
            ])
          )),
        ]),
      ]);
    }
  
    function ProductsPage() {
      const [products, setProducts] = React.useState([
        { id: 1, name: "奶油可頌", price: 40 },
        { id: 2, name: "蜂蜜吐司", price: 35 },
      ]);
  
      function addProduct() {
        const name = prompt("商品名稱？");
        const price = prompt("價格？");
        if (name && price) {
          setProducts([...products, { id: Date.now(), name, price }]);
        }
      }
  
      function deleteProduct(id) {
        setProducts(products.filter(p => p.id !== id));
      }
  
      return React.createElement(Page, { title: "商品管理" }, [
        React.createElement("button", { className: "btn", onClick: addProduct }, "新增商品"),
        React.createElement("table", {}, [
          React.createElement("thead", {}, React.createElement("tr", {}, [
            React.createElement("th", {}, "名稱"),
            React.createElement("th", {}, "價格"),
            React.createElement("th", {}, "操作")
          ])),
          React.createElement("tbody", {}, products.map(p =>
            React.createElement("tr", {}, [
              React.createElement("td", {}, p.name),
              React.createElement("td", {}, "$" + p.price),
              React.createElement("td", {}, [
                React.createElement("button", {
                  className: "btn", onClick: () => deleteProduct(p.id)
                }, "刪除")
              ])
            ])
          ))
        ])
      ]);
    }
  
    function OrdersPage() {
      const [orders, setOrders] = React.useState([
        { id: 101, customer: "王小明", status: "處理中" },
        { id: 102, customer: "李小花", status: "已完成" },
      ]);
  
      function updateStatus(id) {
        setOrders(orders.map(o =>
          o.id === id ? { ...o, status: o.status === "處理中" ? "已完成" : "處理中" } : o
        ));
      }
  
      return React.createElement(Page, { title: "訂單管理" }, [
        React.createElement("table", {}, [
          React.createElement("thead", {}, React.createElement("tr", {}, [
            React.createElement("th", {}, "訂單編號"),
            React.createElement("th", {}, "顧客"),
            React.createElement("th", {}, "狀態"),
            React.createElement("th", {}, "操作")
          ])),
          React.createElement("tbody", {}, orders.map(order =>
            React.createElement("tr", {}, [
              React.createElement("td", {}, order.id),
              React.createElement("td", {}, order.customer),
              React.createElement("td", {}, order.status),
              React.createElement("td", {}, [
                React.createElement("button", {
                  className: "btn", onClick: () => updateStatus(order.id)
                }, "切換狀態")
              ])
            ])
          ))
        ])
      ]);
    }
  
    function PromotionsPage() {
      return React.createElement(Page, { title: "促銷活動" }, [
        React.createElement("p", {}, "模擬設定折扣、優惠碼功能。"),
        React.createElement("input", {
          type: "text", placeholder: "輸入優惠碼", style: { marginRight: "10px" }
        }),
        React.createElement("button", { className: "btn" }, "儲存優惠碼")
      ]);
    }
  
    function ExportPage() {
      return React.createElement(Page, { title: "報表匯出" }, [
        React.createElement("p", {}, "模擬產生報表資料（CSV / Excel 格式）"),
        React.createElement("button", { className: "btn" }, "下載報表")
      ]);
    }
  
    function App() {
      return React.createElement(HashRouter, null,
        React.createElement("div", { className: "container" }, [
          React.createElement(Sidebar, null),
          React.createElement(Switch, null, [
            React.createElement(Route, { path: "/revenue", component: RevenuePage }),
            React.createElement(Route, { path: "/sales", component: SalesPage }),
            React.createElement(Route, { path: "/members", component: MembersPage }),
            React.createElement(Route, { path: "/products", component: ProductsPage }),
            React.createElement(Route, { path: "/orders", component: OrdersPage }),
            React.createElement(Route, { path: "/promotions", component: PromotionsPage }),
            React.createElement(Route, { path: "/export", component: ExportPage }),
            React.createElement(Route, {
              path: "/", exact: true,
              render: () => React.createElement(Page, { title: "歡迎使用商家管理系統" },
                React.createElement("p", {}, "請使用左側選單切換功能"))
            })
          ])
        ])
      );
    }
  
    const root = document.getElementById("root");
    ReactDOM.render(React.createElement(App), root);
  });