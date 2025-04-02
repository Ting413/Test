
window.addEventListener("DOMContentLoaded", function () {
    const { HashRouter, Route, Link, Switch, useHistory } = window.ReactRouterDOM;

    function Sidebar() {
        const [hovered, setHovered] = React.useState(null);
        const [showSalesMenu, setShowSalesMenu] = React.useState(false);
        const [showMemberMenu, setShowMemberMenu] = React.useState(false);
      
        const toggleSalesMenu = () => setShowSalesMenu(prev => !prev);
        const toggleMemberMenu = () => setShowMemberMenu(prev => !prev);
      
        return React.createElement("div", { className: "sidebar" }, [
          React.createElement("h2", {}, "商家管理"),
          React.createElement("nav", {}, [
            React.createElement(Link, { key: "revenue", to: "/revenue" }, "營收統計"),
      
            React.createElement("div", {
              key: "sales",
              onMouseEnter: () => setHovered("sales"),
              onMouseLeave: () => setHovered(null),
              onClick: toggleSalesMenu,
              style: { cursor: "pointer" }
            }, [
              React.createElement("div", {
                style: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "6px" }
              }, [
                React.createElement(Link, {
                  to: "/sales",
                  style: { flexGrow: 1, color: "white", textDecoration: "none" }
                }, "銷售趨勢"),
                React.createElement("span", { style: { transition: "transform 0.2s", transform: hovered === "sales" || showSalesMenu ? "rotate(180deg)" : "rotate(0deg)" } }, "▼")
              ]),
      
              (hovered === "sales" || showSalesMenu) && React.createElement("div", {
                style: {
                  paddingLeft: "12px",
                  marginTop: "6px",
                  transition: "all 0.2s ease",
                  overflow: "hidden"
                }
              }, [
                React.createElement(Link, {
                  key: "sales-overview-link",
                  to: "/sales/overview",
                  style: { display: "block", margin: "4px 0", color: "white" }
                }, "📊 營收總匯"),
                React.createElement(Link, {
                  key: "sales-revenue-link",
                  to: "/sales/revenue",
                  style: { display: "block", margin: "4px 0", color: "white" }
                }, "📈 營收統計"),
                React.createElement(Link, {
                  key: "sales-product-link",
                  to: "/sales/product",
                  style: { display: "block", margin: "4px 0", color: "white" }
                }, "📦 銷售統計")
              ])
            ]),
      
            React.createElement("div", {
              key: "member",
              onMouseEnter: () => setHovered("member"),
              onMouseLeave: () => setHovered(null),
              onClick: toggleMemberMenu,
              style: { cursor: "pointer" }
            }, [
              React.createElement("div", {
                style: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "6px" }
              }, [
                React.createElement(Link, {
                  to: "/members",
                  style: { flexGrow: 1, color: "white", textDecoration: "none" }
                }, "會員管理"),
                React.createElement("span", { style: { transition: "transform 0.2s", transform: hovered === "member" || showMemberMenu ? "rotate(180deg)" : "rotate(0deg)" } }, "▼")
              ]),
      
              (hovered === "member" || showMemberMenu) && React.createElement("div", {
                style: {
                  paddingLeft: "12px",
                  marginTop: "6px",
                  transition: "all 0.2s ease",
                  overflow: "hidden"
                }
              }, [
                React.createElement(Link, {
                  key: "member-all",
                  to: "/members",
                  style: { display: "block", margin: "4px 0", color: "white" }
                }, "🧑‍🤝‍🧑 會員清單"),
                React.createElement(Link, {
                  key: "member-tags",
                  to: "/members#tags",
                  style: { display: "block", margin: "4px 0", color: "white" }
                }, "🏷️ 標籤管理"),
                React.createElement(Link, {
                  key: "member-birthday",
                  to: "/members#birthdays",
                  style: { display: "block", margin: "4px 0", color: "white" }
                }, "🎂 生日優惠")
              ])
            ]),
      
            React.createElement(Link, { key: "products", to: "/products" }, "商品管理"),
            React.createElement(Link, { key: "orders", to: "/orders" }, "訂單管理"),
            React.createElement(Link, { key: "promotions", to: "/promotions" }, "促銷活動"),
            React.createElement(Link, { key: "export", to: "/export" }, "報表匯出")
          ])
        ]);
      }

    function RevenuePage() {
        const orders = [
            { id: 1, date: "2025-04-01", total: 120, method: "現金" },
            { id: 2, date: "2025-04-01", total: 240, method: "LinePay" },
            { id: 3, date: "2025-04-02", total: 100, method: "貨到付款" },
            { id: 4, date: "2025-04-02", total: 300, method: "現金" },
            { id: 5, date: "2025-04-03", total: 160, method: "LinePay" },
            { id: 6, date: "2025-04-04", total: 400, method: "現金" },
            { id: 7, date: "2025-04-04", total: 250, method: "LinePay" },
            { id: 8, date: "2025-04-05", total: 180, method: "現金" }
        ];

        const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split("T")[0]);
        const [filteredOrders, setFilteredOrders] = React.useState([]);

        function handleSearch() {
            const filtered = orders.filter(o => o.date === selectedDate);
            setFilteredOrders(filtered);
        }

        const total = filteredOrders.reduce((sum, o) => sum + o.total, 0);
        const count = filteredOrders.length;

        return React.createElement(Page, { title: "營收統計" }, [
            React.createElement("div", {
                style: {
                    marginBottom: "20px",
                    background: "#fdf3e7",
                    padding: "20px",
                    borderRadius: "8px"
                }
            }, [
                React.createElement("h2", {
                    style: { marginBottom: "10px", fontSize: "20px", color: "#774b30" }
                }, "📊 業績總攬"),

                React.createElement("label", {
                    style: { fontSize: "16px", marginRight: "10px" }
                }, "選擇查詢日期："),

                React.createElement("input", {
                    type: "date",
                    value: selectedDate,
                    onChange: e => setSelectedDate(e.target.value),
                    style: {
                        padding: "6px 12px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginRight: "10px"
                    }
                }),

                React.createElement("button", {
                    className: "btn",
                    onClick: handleSearch,
                    style: {
                        fontSize: "16px",
                        padding: "6px 16px",
                        backgroundColor: "#f58322",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }
                }, "查詢")
            ]),

            selectedDate && React.createElement("div", {
                style: {
                    background: "#fff4e4",
                    padding: "20px",
                    borderRadius: "8px",
                    marginTop: "10px",
                    marginBottom: "20px",
                    fontSize: "18px"
                }
            }, [
                React.createElement("h3", {
                    style: { marginBottom: "10px", color: "#9f5933" }
                }, "查詢日期：" + selectedDate),
                React.createElement("p", {}, "總營收：$" + total),
                React.createElement("p", {}, "訂單數：" + count + " 筆")
            ])
        ]);
    }

    function Page({ title, children }) {
        return React.createElement("div", { className: "main" }, [
          React.createElement("h1", {}, title),
          ...(Array.isArray(children) ? children : [children])
        ]);
      }
      
      // 📊 銷售趨勢頁（掛載子路由）
      function SalesOverviewPage() {
        return React.createElement(Page, { title: "營收總匯" }, [
          React.createElement("p", {}, "此處顯示營收總匯內容...")
        ]);
      }
      
      function SalesRevenuePage() {
        return React.createElement(Page, { title: "營收統計" }, [
          React.createElement("p", {}, "此處顯示營收統計內容...")
        ]);
      }
      
      function SalesProductPage() {
        return React.createElement(Page, { title: "銷售統計" }, [
          React.createElement("p", {}, "此處顯示銷售統計內容...")
        ]);
      }
      
      function SalesPage() {
        return React.createElement(ReactRouterDOM.Switch, null, [
          React.createElement(ReactRouterDOM.Route, {
            key: "sales-overview",
            path: "/sales/overview",
            component: SalesOverviewPage
          }),
          React.createElement(ReactRouterDOM.Route, {
            key: "sales-revenue",
            path: "/sales/revenue",
            component: SalesRevenuePage
          }),
          React.createElement(ReactRouterDOM.Route, {
            key: "sales-product",
            path: "/sales/product",
            component: SalesProductPage
          })
        ]);
      }



    function getBirthdayMonthPromotions(memberBirthday, promotions) {
        if (!memberBirthday) return [];
        const bMonth = new Date(memberBirthday).getMonth();
        const currentMonth = new Date().getMonth();
        return promotions.filter(promo => promo.target === "BIRTHDAY" && bMonth === currentMonth);
    }

    function simulateSendNotification(member, promoList) {
        const message = `\n📩 發送給 ${member.name} (${member.email})\n優惠內容：\n` +
            promoList.map(p => `🎁 ${p.code} - ${p.description} (${p.discount}${p.type === "percent" ? "%" : "元"})`).join("\n");

        console.log("[模擬通知]", message);
        alert("已模擬發送給會員：" + member.name + "\n\n請查看 Console 查看詳細訊息。");
    }

    function exportPromotionsAsCSV(promoList) {
        const header = ["代碼", "折扣", "類型", "描述", "開始日", "結束日", "最低消費", "限定商品", "對象"];
        const rows = promoList.map(p => [
            p.code, p.discount, p.type, p.description, p.start, p.end, p.minSpend, p.products, p.target
        ]);
        let csvContent = "\uFEFF" + header.join(",") + "\n" + rows.map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "促銷活動報表.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function MembersPage() {
        const [search, setSearch] = React.useState("");
        const [selected, setSelected] = React.useState(null);
        const [editing, setEditing] = React.useState(null);
        const [members, setMembers] = React.useState([
            {
                name: "王小明",
                email: "ming@mail.com",
                orders: 5,
                lastOrder: "2025-03-28",
                totalSpent: 12000,
                note: "喜歡可頌",
                birthday: "1990-04-15"
            },
            {
                name: "李小花",
                email: "hua@mail.com",
                orders: 2,
                lastOrder: "2025-03-10",
                totalSpent: 3000,
                note: "偏好吐司",
                birthday: "1995-05-12"
            }
        ]);

        const allPromotions = [
            {
                code: "HBDTOYOU",
                discount: 40,
                type: "percent",
                description: "生日優惠 6 折",
                start: "2025-04-01",
                end: "2025-04-30",
                minSpend: 100,
                products: "",
                repeatable: false,
                target: "BIRTHDAY"
            }
        ];

        const [editForm, setEditForm] = React.useState({
            name: "", email: "", orders: "", totalSpent: "", lastOrder: "", note: "", birthday: ""
        });

        function getLevel(total) {
            if (total >= 10000) return "VIP";
            if (total >= 5000) return "黃金";
            return "普通";
        }

        function getTags(member) {
            const tags = [];
            const level = getLevel(member.totalSpent);
            if (level === "VIP") tags.push("高消費");
            if (member.orders >= 5) tags.push("高回購");

            if (
                member.birthday &&
                new Date(member.birthday).getMonth() === new Date().getMonth()
            ) {
                tags.push("生日月");
            }

            return tags;
        }

        const filtered = members.filter(m =>
            m.name.includes(search) || m.email.includes(search)
        );

        function startEdit(m) {
            setEditing(m);
            setEditForm({ ...m });
        }

        function saveEdit() {
            setMembers(members.map(m =>
                m.email === editing.email
                    ? { ...editForm, orders: parseInt(editForm.orders), totalSpent: parseInt(editForm.totalSpent) }
                    : m
            ));
            setEditing(null);
        }

        return React.createElement(Page, { title: "會員管理" }, [
            React.createElement("div", { className: "search-box" }, [
                React.createElement("input", {
                    type: "text",
                    placeholder: "搜尋姓名 / Email",
                    value: search,
                    onChange: e => setSearch(e.target.value)
                })
            ]),

            editing && React.createElement("div", {
                style: {
                    backgroundColor: "#fff4e4",
                    padding: "20px",
                    marginBottom: "20px",
                    borderRadius: "8px"
                }
            }, [
                React.createElement("h2", {}, "編輯會員資料"),
                React.createElement("p", {}, "Email (不可改): " + editForm.email),
                React.createElement("label", {}, "姓名："),
                React.createElement("input", {
                    value: editForm.name,
                    onChange: e => setEditForm({ ...editForm, name: e.target.value })
                }),
                React.createElement("label", {}, "回購次數："),
                React.createElement("input", {
                    type: "number",
                    value: editForm.orders,
                    onChange: e => setEditForm({ ...editForm, orders: e.target.value })
                }),
                React.createElement("label", {}, "總消費金額："),
                React.createElement("input", {
                    type: "number",
                    value: editForm.totalSpent,
                    onChange: e => setEditForm({ ...editForm, totalSpent: e.target.value })
                }),
                React.createElement("label", {}, "最近下單："),
                React.createElement("input", {
                    type: "date",
                    value: editForm.lastOrder,
                    onChange: e => setEditForm({ ...editForm, lastOrder: e.target.value })
                }),
                React.createElement("label", {}, "生日："),
                React.createElement("input", {
                    type: "date",
                    value: editForm.birthday,
                    onChange: e => setEditForm({ ...editForm, birthday: e.target.value })
                }),
                React.createElement("label", {}, "備註："),
                React.createElement("textarea", {
                    value: editForm.note,
                    rows: 2,
                    style: { width: "100%" },
                    onChange: e => setEditForm({ ...editForm, note: e.target.value })
                }),
                React.createElement("div", { style: { marginTop: "10px" } }, [
                    React.createElement("button", { className: "btn", onClick: saveEdit }, "儲存"),
                    React.createElement("button", { className: "btn", onClick: () => setEditing(null) }, "取消")
                ])
            ]),

            selected && React.createElement("div", {
                style: {
                    backgroundColor: "#fffbe6",
                    padding: "20px",
                    marginBottom: "20px",
                    borderRadius: "8px"
                }
            }, [
                React.createElement("h2", {}, selected.name + " - 詳細資料"),
                React.createElement("p", {}, "Email: " + selected.email),
                React.createElement("p", {}, "會員等級: " + getLevel(selected.totalSpent)),
                React.createElement("p", {}, "累積消費: $" + selected.totalSpent),
                React.createElement("p", {}, "回購次數: " + selected.orders + " 次"),
                React.createElement("p", {}, "最近下單: " + selected.lastOrder),
                React.createElement("p", {}, "生日: " + selected.birthday),
                React.createElement("p", {}, "備註: " + selected.note),
                React.createElement("p", {}, "標籤: " + getTags(selected).join(", ")),
                React.createElement("button", {
                    className: "btn",
                    onClick: () => setSelected(null)
                }, "關閉"),
                React.createElement("button", {
                    className: "btn",
                    onClick: () => {
                        const birthdayPromos = getBirthdayMonthPromotions(selected.birthday, allPromotions);
                        simulateSendNotification(selected, birthdayPromos);
                    },
                    style: { marginLeft: "10px" }
                }, "🎁 模擬發送生日優惠")
            ]),

            React.createElement("table", {}, [
                React.createElement("thead", {}, React.createElement("tr", {}, [
                    React.createElement("th", {}, "姓名"),
                    React.createElement("th", {}, "Email"),
                    React.createElement("th", {}, "等級"),
                    React.createElement("th", {}, "回購次數"),
                    React.createElement("th", {}, "最近下單"),
                    React.createElement("th", {}, "標籤"),
                    React.createElement("th", {}, "備註"),
                    React.createElement("th", {}, "操作")
                ])),
                React.createElement("tbody", {}, filtered.map((m, i) =>
                    React.createElement("tr", { key: i }, [
                        React.createElement("td", {}, m.name),
                        React.createElement("td", {}, m.email),
                        React.createElement("td", {}, getLevel(m.totalSpent)),
                        React.createElement("td", {}, m.orders),
                        React.createElement("td", {}, m.lastOrder),
                        React.createElement("td", {}, getTags(m).map(t =>
                            React.createElement("span", {
                                style: {
                                    padding: "2px 6px",
                                    marginRight: "4px",
                                    backgroundColor: "#f9c066",
                                    borderRadius: "6px",
                                    fontSize: "12px"
                                }
                            }, t)
                        )),
                        React.createElement("td", {}, m.note),
                        React.createElement("td", {}, [
                            React.createElement("button", {
                                className: "btn", onClick: () => setSelected(m)
                            }, "查看"),
                            React.createElement("button", {
                                className: "btn", onClick: () => startEdit(m)
                            }, "編輯")
                        ])
                    ])
                ))
            ])
        ]);
    }

    function ProductsPage() {
        const [products, setProducts] = React.useState([
            {
                id: 1,
                name: "牛軋餅原味",
                description: "經典原味牛軋餅，嚴選香濃牛軋糖與酥脆蘇打餅結合，甜鹹交融、口感層次豐富。每一口都能感受奶香與餅香交織，是不可錯過的美味點心。",
                category: "牛軋餅",
                price: 120,
                stock: 50,
                image: "images/nougat-original.jpg"
            },
            {
                id: 2,
                name: "牛軋餅蔓越莓口味",
                description: "在奶香牛軋糖中加入酸甜蔓越莓果乾，搭配鹹香餅乾，吃得到清新果香與綿密口感。酸甜適中，不膩口，是送禮與自食的雙重首選。",
                category: "牛軋餅",
                price: 130,
                stock: 40,
                image: "images/nougat-cranberry.jpg"
            },
            {
                id: 3,
                name: "牛軋餅抹茶味",
                description: "融合日本抹茶與牛軋糖，帶出淡雅茶香與濃郁奶香的絕妙平衡。夾在香酥餅乾中，呈現甜鹹層次，是抹茶控不能錯過的風味。",
                category: "牛軋餅",
                price: 130,
                stock: 35,
                image: "images/nougat-matcha.jpg"
            },
            {
                id: 4,
                name: "牛軋餅咖啡味",
                description: "濃郁咖啡風味牛軋糖，搭配微鹹蘇打餅，香氣四溢、甜中帶點成熟的苦韻。適合喜愛咖啡風味的大人系甜點，下午茶良伴首選。",
                category: "牛軋餅",
                price: 130,
                stock: 30,
                image: "images/nougat-coffee.jpg"
            },
            {
                id: 5,
                name: "方塊酥抹茶味",
                description: "酥鬆的方塊酥餅體中夾入香濃抹茶牛軋糖，融合茶香與奶香，吃起來細膩不膩。淡雅茶香與酥脆餅皮在口中完美交融，讓人一口接一口。",
                category: "方塊酥",
                price: 110,
                stock: 40,
                image: "images/square-matcha.jpg"
            },
            {
                id: 6,
                name: "方塊酥咖啡味",
                description: "咖啡風味牛軋糖夾於香酥方塊酥餅中，外酥內Q、口感豐富。香氣濃郁的咖啡與奶香交織，搭配茶飲更添風味，是精緻又耐吃的點心。",
                category: "方塊酥",
                price: 110,
                stock: 35,
                image: "images/square-coffee.jpg"
            },
            {
                id: 7,
                name: "夏威夷莓果Q糖",
                description: "結合Q彈牛軋糖與酸甜莓果，內含夏威夷豆，果香與堅果香完美融合。每一口都能感受自然果乾的清香與堅果的爽脆，健康又美味。",
                category: "牛軋糖",
                price: 150,
                stock: 25,
                image: "images/nougat-berry.jpg"
            },
            {
                id: 8,
                name: "可可夏威夷Q糖",
                description: "濃郁可可風味牛軋糖，搭配夏威夷果仁，甜而不膩，Q彈滑順中帶有香脆堅果口感。巧克力控與堅果控都會愛上的經典美味。",
                category: "牛軋糖",
                price: 150,
                stock: 20,
                image: "images/nougat-cocoa.jpg"
            },
            {
                id: 9,
                name: "港式芝麻糊Q糖",
                description: "延續傳統港式芝麻糊風味，將黑芝麻香濃融合在Q彈糖體中。口感綿密滑順，帶有迷人的芝麻香，是復古與創新兼具的特色甜點。",
                category: "牛軋糖",
                price: 140,
                stock: 20,
                image: "images/nougat-sesame.jpg"
            },
            {
                id: 10,
                name: "草莓牛軋糖",
                description: "選用天然草莓果乾與奶香牛軋糖製成，口感Q彈、果香撲鼻。酸甜交織不黏牙，是最受歡迎的夢幻口味之一，深受女孩們喜愛。",
                category: "牛軋糖",
                price: 140,
                stock: 22,
                image: "images/nougat-strawberry.jpg"
            },
            {
                id: 11,
                name: "棗泥蛋黃酥",
                description: "酥香外皮中包裹綿密香甜的棗泥與鹹蛋黃，鹹甜融合、層次細膩。棗泥香氣濃郁、口感滑順，與酥皮完美結合，是中式點心的經典之作。",
                category: "中式酥點",
                price: 180,
                stock: 18,
                image: "images/yolk-pastry.jpg"
            },
            {
                id: 12,
                name: "月娘酥",
                description: "外層金黃酥皮包裹細緻綠豆沙餡，甜而不膩、入口即化。綠豆沙香氣溫潤滑順，搭配酥鬆餅皮，呈現出樸實又迷人的傳統滋味。",
                category: "中式酥點",
                price: 160,
                stock: 20,
                image: "images/moon-pastry.jpg"
            },
            {
                id: 13,
                name: "台式馬卡龍",
                description: "外酥內Q的傳統口味，散發濃郁蛋香與糖香，口感樸實甜美。與法式馬卡龍相比，更有台灣在地風味，是許多人記憶中的童年零嘴。",
                category: "傳統餅乾",
                price: 100,
                stock: 30,
                image: "images/taiwan-macaron.jpg"
            },
            {
                id: 14,
                name: "吐司",
                description: "使用高級小麥粉與天然酵母，製成柔軟蓬鬆的吐司，每一口都充滿自然奶香。適合搭配果醬、奶油或製作三明治，是日常不可或缺的基本款。",
                category: "吐司",
                price: 60,
                stock: 40,
                image: "images/bread.jpg"
            },
            {
                id: 15,
                name: "葡萄吐司",
                description: "在柔軟吐司中加入飽滿香甜葡萄乾，果香自然、口感豐富。輕咬即能感受果乾甜味與麵包柔軟的完美融合，是早餐與下午茶的好選擇。",
                category: "吐司",
                price: 70,
                stock: 35,
                image: "images/raisin-bread.jpg"
            },
            {
                id: 16,
                name: "肉桂捲",
                description: "金黃酥香的麵包體捲入香濃肉桂醬，撒上堅果或糖霜，濃郁香氣令人著迷。甜中帶辣、層層分明，是寒冷天氣裡最療癒的甜點之一。",
                category: "西式烘焙",
                price: 90,
                stock: 28,
                image: "images/cinnamon-roll.jpg"
            },
            {
                id: 17,
                name: "瑪德蓮",
                description: "經典法式甜點，以奶油與蛋香為基底，外殼微酥、內裡濕潤。淡淡檸檬香氣清爽提味，貝殼形狀精緻討喜，是下午茶桌上的亮點之一。",
                category: "西式烘焙",
                price: 85,
                stock: 26,
                image: "images/madeleine.jpg"
            }
        ]);


        const [categoryFilter, setCategoryFilter] = React.useState("全部");
        const [showForm, setShowForm] = React.useState(false);
        const [editing, setEditing] = React.useState(null);
        const [form, setForm] = React.useState({
            name: "",
            price: "",
            category: "",
            stock: "",
            image: "",
            description: ""
        });

        const categories = ["全部", ...new Set(products.map(p => p.category))];
        const filteredProducts = categoryFilter === "全部" ? products : products.filter(p => p.category === categoryFilter);

        function openForm(product) {
            if (product) {
                setEditing(product.id);
                setForm({ ...product });
            } else {
                setEditing(null);
                setForm({ name: "", price: "", category: categories[1] || "", stock: "", image: "", description: "" });
            }
            setShowForm(true);
        }

        function closeForm() {
            setShowForm(false);
        }

        function saveProduct() {
            if (!form.name || isNaN(form.price) || isNaN(form.stock)) {
                alert("請填寫正確的欄位！");
                return;
            }
            const product = {
                ...form,
                price: parseInt(form.price, 10),
                stock: parseInt(form.stock, 10),
                image: form.image || "https://via.placeholder.com/60"
            };
            if (editing) {
                setProducts(products.map(p => (p.id === editing ? { ...product, id: editing } : p)));
            } else {
                setProducts([...products, { ...product, id: Date.now() }]);
            }
            setShowForm(false);
        }

        function deleteProduct(id) {
            setProducts(products.filter(p => p.id !== id));
        }

        return React.createElement(Page, { title: "商品管理" }, [
            React.createElement("div", { style: { marginBottom: "16px" } }, [
                React.createElement("label", { style: { marginRight: "8px", fontWeight: "bold" } }, "篩選分類："),
                React.createElement("select", {
                    value: categoryFilter,
                    onChange: e => setCategoryFilter(e.target.value),
                    style: { padding: "6px 12px", fontSize: "16px" }
                }, categories.map((cat, idx) =>
                    React.createElement("option", { key: idx, value: cat }, cat)
                ))
            ]),

            React.createElement("button", { className: "btn", onClick: () => openForm(null), style: { marginBottom: "16px" } }, "新增商品"),

            showForm && React.createElement("div", {
                style: { backgroundColor: "#fff3e0", padding: "20px", margin: "20px 0", borderRadius: "8px" }
            }, [
                React.createElement("h2", {}, editing ? "編輯商品" : "新增商品"),
                React.createElement("div", {}, [
                    React.createElement("label", {}, "名稱："),
                    React.createElement("input", {
                        value: form.name,
                        onChange: e => setForm({ ...form, name: e.target.value })
                    })
                ]),
                React.createElement("div", {}, [
                    React.createElement("label", {}, "價格："),
                    React.createElement("input", {
                        type: "number",
                        value: form.price,
                        onChange: e => setForm({ ...form, price: e.target.value })
                    })
                ]),
                React.createElement("div", {}, [
                    React.createElement("label", {}, "分類："),
                    React.createElement("select", {
                        value: form.category,
                        onChange: e => setForm({ ...form, category: e.target.value })
                    }, categories.filter(c => c !== "全部").map(c => React.createElement("option", { key: c, value: c }, c)))
                ]),
                React.createElement("div", {}, [
                    React.createElement("label", {}, "庫存："),
                    React.createElement("input", {
                        type: "number",
                        value: form.stock,
                        onChange: e => setForm({ ...form, stock: e.target.value })
                    })
                ]),
                React.createElement("div", {}, [
                    React.createElement("label", {}, "圖片網址："),
                    React.createElement("input", {
                        value: form.image,
                        onChange: e => setForm({ ...form, image: e.target.value })
                    })
                ]),
                React.createElement("div", {}, [
                    React.createElement("label", {}, "介紹："),
                    React.createElement("textarea", {
                        value: form.description,
                        rows: 3,
                        style: { width: "100%" },
                        onChange: e => setForm({ ...form, description: e.target.value })
                    })
                ]),
                React.createElement("div", { style: { marginTop: "10px" } }, [
                    React.createElement("button", { className: "btn", onClick: saveProduct }, "儲存"),
                    React.createElement("button", { className: "btn", onClick: closeForm }, "取消")
                ])
            ]),

            React.createElement("table", {}, [
                React.createElement("thead", {}, React.createElement("tr", {}, [
                    React.createElement("th", {}, "編號"),
                    React.createElement("th", {}, "圖片"),
                    React.createElement("th", {}, "名稱"),
                    React.createElement("th", {}, "介紹"),
                    React.createElement("th", {}, "分類"),
                    React.createElement("th", {}, "價格"),
                    React.createElement("th", {}, "庫存"),
                    React.createElement("th", {}, "操作")
                ])),
                React.createElement("tbody", {}, filteredProducts.map((p, index) =>
                    React.createElement("tr", { key: p.id }, [
                        React.createElement("td", {}, index + 1),
                        React.createElement("td", {}, React.createElement("img", {
                            src: p.image,
                            alt: p.name,
                            width: 60,
                            height: 60,
                            style: { objectFit: "cover", borderRadius: "6px" }
                        })),
                        React.createElement("td", {}, p.name),
                        React.createElement("td", {
                            style: {
                                width: "350px"
                            },
                            title: p.description
                        }, p.description),
                        React.createElement("td", {}, p.category),
                        React.createElement("td", {}, "$" + p.price),
                        React.createElement("td", {}, p.stock),
                        React.createElement("td", {}, [
                            React.createElement("button", {
                                className: "btn", onClick: () => openForm(p)
                            }, "編輯"),
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
        const [search, setSearch] = React.useState("");
        const [dateFrom, setDateFrom] = React.useState("");
        const [dateTo, setDateTo] = React.useState("");

        const [orders, setOrders] = React.useState([
            {
                id: 101,
                customer: "王小明",
                items: [
                    { name: "奶油可頌", qty: 2, price: 40 },
                    { name: "蜂蜜吐司", qty: 1, price: 35 }
                ],
                payment: "貨到付款",
                status: "待確認",
                orderDate: "2025-04-01",
                pickupDate: "2025-04-08"
            },
            {
                id: 102,
                customer: "李小花",
                items: [
                    { name: "鹽可頌", qty: 3, price: 38 }
                ],
                payment: "Line Pay",
                status: "製作中",
                orderDate: "2025-04-02",
                pickupDate: "2025-04-09"
            }
        ]);

        const statusList = ["待確認", "製作中", "可取貨", "已取貨"];

        function updateStatus(id, newStatus) {
            setOrders(orders.map(o =>
                o.id === id ? { ...o, status: newStatus } : o
            ));
        }

        function getTotal(order) {
            return order.items.reduce((sum, item) => sum + item.qty * item.price, 0);
        }

        function exportCSV(customer) {
            const filtered = orders.filter(o => o.customer === customer);
            if (filtered.length === 0) return alert("找不到此顧客訂單！");
            let csv = "訂單編號,下單時間,取貨時間,商品明細,付款方式,狀態,總金額\\n";
            filtered.forEach(o => {
                const items = o.items.map(i => `${i.name}x${i.qty}`).join(" ");
                const total = getTotal(o);
                csv += `${o.id},${o.orderDate},${o.pickupDate},${items},${o.payment},${o.status},${total}\\n`;
            });
            const blob = new Blob([csv], { type: "text/csv" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = customer + "_訂單報表.csv";
            a.click();
        }

        const filteredOrders = orders.filter(o => {
            const matchSearch = o.customer.includes(search) || o.id.toString().includes(search);
            const matchDate =
                (!dateFrom || o.orderDate >= dateFrom) &&
                (!dateTo || o.orderDate <= dateTo);
            return matchSearch && matchDate;
        });

        return React.createElement(Page, { title: "訂單管理" }, [
            React.createElement("div", { className: "search-box" }, [
                React.createElement("input", {
                    type: "text",
                    placeholder: "搜尋顧客 / 訂單編號",
                    value: search,
                    onChange: e => setSearch(e.target.value)
                }),
                React.createElement("input", {
                    type: "date",
                    value: dateFrom,
                    onChange: e => setDateFrom(e.target.value),
                    style: { marginLeft: "10px" }
                }),
                React.createElement("input", {
                    type: "date",
                    value: dateTo,
                    onChange: e => setDateTo(e.target.value),
                    style: { marginLeft: "10px" }
                }),
                React.createElement("button", {
                    className: "btn",
                    style: { marginLeft: "10px" },
                    onClick: () => exportCSV(search.trim())
                }, "匯出顧客訂單")
            ]),
            React.createElement("table", {}, [
                React.createElement("thead", {}, React.createElement("tr", {}, [
                    React.createElement("th", {}, "訂單編號"),
                    React.createElement("th", {}, "顧客"),
                    React.createElement("th", {}, "下單時間"),
                    React.createElement("th", {}, "取貨時間"),
                    React.createElement("th", {}, "商品明細"),
                    React.createElement("th", {}, "付款方式"),
                    React.createElement("th", {}, "狀態"),
                    React.createElement("th", {}, "總金額"),
                    React.createElement("th", {}, "操作")
                ])),
                React.createElement("tbody", {}, filteredOrders.map(order =>
                    React.createElement("tr", { key: order.id }, [
                        React.createElement("td", {}, order.id),
                        React.createElement("td", {}, order.customer),
                        React.createElement("td", {}, order.orderDate),
                        React.createElement("td", {}, order.pickupDate),
                        React.createElement("td", {}, order.items.map(i => `${i.name} x${i.qty}`).join(", ")),
                        React.createElement("td", {}, order.payment),
                        React.createElement("td", {}, order.status),
                        React.createElement("td", {}, "$" + getTotal(order)),
                        React.createElement("td", {}, [
                            React.createElement("select", {
                                value: order.status,
                                onChange: e => updateStatus(order.id, e.target.value)
                            }, statusList.map(s => React.createElement("option", { key: s, value: s }, s)))
                        ])
                    ])
                ))
            ])
        ]);
    }



    function PromotionsPage() {
        React.createElement(Route, {
            path: "/promotions",
            component: PromotionsPage
        });

        const [promoList, setPromoList] = React.useState([
            {
                code: "SPRING20",
                discount: 20,
                type: "percent",
                description: "春季折扣 8 折",
                start: "2025-04-01",
                end: "2025-04-30",
                minSpend: 500,
                products: "可頌,吐司",
                repeatable: false,
                target: "ALL"
            },
            {
                code: "HBDTOYOU",
                discount: 40,
                type: "percent",
                description: "生日當月限定優惠 6 折（滿 100 元）",
                start: "2025-04-01",
                end: "2025-04-30",
                minSpend: 100,
                products: "",
                repeatable: false,
                target: "BIRTHDAY"
            }
        ]);

        const [form, setForm] = React.useState({
            code: "", discount: "", type: "percent", description: "", start: "", end: "",
            minSpend: "", products: "", repeatable: false, target: "ALL"
        });

        function addPromo() {
            if (!form.code || !form.discount || !form.start || !form.end) {
                alert("請填寫完整資訊！");
                return;
            }
            setPromoList([...promoList, form]);
            setForm({ code: "", discount: "", type: "percent", description: "", start: "", end: "", minSpend: "", products: "", repeatable: false, target: "ALL" });
        }

        function deletePromo(code) {
            setPromoList(promoList.filter(p => p.code !== code));
        }

        function getStatus(promo) {
            const today = new Date();
            const start = new Date(promo.start);
            const end = new Date(promo.end);
            if (today < start) return "尚未開始";
            if (today > end) return "已過期";
            const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
            return "進行中（剩 " + diff + " 天）";
        }

        function exportPromotionsAsCSV(promoList) {
            const header = ["代碼", "折扣", "類型", "描述", "開始日", "結束日", "最低消費", "限定商品", "對象"];
            const rows = promoList.map(p => [
                p.code, p.discount, p.type, p.description, p.start, p.end, p.minSpend, p.products, p.target
            ]);
            let csvContent = "\uFEFF" + header.join(",") + "\n" + rows.map(row => row.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "促銷活動報表.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        return React.createElement(Page, { title: "促銷活動管理" }, [
            React.createElement("div", { style: { marginBottom: "20px" } }, [
                React.createElement("h3", {}, "新增促銷活動"),
                React.createElement("input", {
                    placeholder: "優惠代碼",
                    value: form.code,
                    onChange: e => setForm({ ...form, code: e.target.value })
                }),
                React.createElement("select", {
                    value: form.type,
                    onChange: e => setForm({ ...form, type: e.target.value })
                }, [
                    React.createElement("option", { value: "percent" }, "折扣 (%)"),
                    React.createElement("option", { value: "fixed" }, "折抵金額 (元)")
                ]),
                React.createElement("input", {
                    type: "number",
                    placeholder: "折扣數值",
                    value: form.discount,
                    onChange: e => setForm({ ...form, discount: e.target.value })
                }),
                React.createElement("input", {
                    placeholder: "活動說明",
                    value: form.description,
                    onChange: e => setForm({ ...form, description: e.target.value })
                }),
                React.createElement("input", {
                    type: "date",
                    value: form.start,
                    onChange: e => setForm({ ...form, start: e.target.value })
                }),
                React.createElement("input", {
                    type: "date",
                    value: form.end,
                    onChange: e => setForm({ ...form, end: e.target.value })
                }),
                React.createElement("input", {
                    type: "number",
                    placeholder: "最低消費金額",
                    value: form.minSpend,
                    onChange: e => setForm({ ...form, minSpend: e.target.value })
                }),
                React.createElement("div", {}, [
                    React.createElement("label", {}, "限定商品："),
                    React.createElement("input", {
                        placeholder: "用 , 分隔多個商品",
                        value: form.products,
                        onChange: e => setForm({ ...form, products: e.target.value })
                    })
                ]),
                React.createElement("div", {}, [
                    React.createElement("label", {}, [
                        React.createElement("input", {
                            type: "checkbox",
                            checked: form.repeatable,
                            onChange: e => setForm({ ...form, repeatable: e.target.checked })
                        }),
                        " 可重複使用"
                    ])
                ]),
                React.createElement("label", {}, "發送對象："),
                React.createElement("select", {
                    value: form.target,
                    onChange: e => setForm({ ...form, target: e.target.value })
                }, [
                    React.createElement("option", { value: "ALL" }, "所有人"),
                    React.createElement("option", { value: "VIP" }, "VIP 專屬"),
                    React.createElement("option", { value: "BIRTHDAY" }, "生日當月")
                ]),
                React.createElement("button", {
                    className: "btn",
                    onClick: addPromo,
                    style: { marginTop: "10px" }
                }, "新增活動"),
                React.createElement("button", {
                    className: "btn",
                    onClick: () => exportPromotionsAsCSV(promoList),
                    style: { marginLeft: "10px", backgroundColor: "#f58322" }
                }, "📤 匯出優惠報表")
            ]),

            React.createElement("table", {}, [
                React.createElement("thead", {}, React.createElement("tr", {}, [
                    React.createElement("th", {}, "代碼"),
                    React.createElement("th", {}, "折扣"),
                    React.createElement("th", {}, "說明"),
                    React.createElement("th", {}, "條件"),
                    React.createElement("th", {}, "對象"),
                    React.createElement("th", {}, "期限"),
                    React.createElement("th", {}, "狀態"),
                    React.createElement("th", {}, "操作")
                ])),
                React.createElement("tbody", {}, promoList.map((promo, i) =>
                    React.createElement("tr", { key: i }, [
                        React.createElement("td", {}, promo.code),
                        React.createElement("td", {}, promo.type === "percent" ? promo.discount + "%" : "$" + promo.discount),
                        React.createElement("td", {}, promo.description),
                        React.createElement("td", {}, [
                            React.createElement("div", {}, "最低 $" + promo.minSpend),
                            React.createElement("div", {}, "限定商品：" + promo.products),
                            React.createElement("div", {}, promo.repeatable ? "可重複使用" : "僅限一次")
                        ]),
                        React.createElement("td", {}, promo.target === "VIP" ? "VIP" : promo.target === "BIRTHDAY" ? "生日當月" : "所有人"),
                        React.createElement("td", {}, promo.start + " ~ " + promo.end),
                        React.createElement("td", {}, getStatus(promo)),
                        React.createElement("td", {}, [
                            React.createElement("button", {
                                className: "btn",
                                onClick: () => deletePromo(promo.code)
                            }, "刪除")
                        ])
                    ])
                ))
            ])
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
                    React.createElement(Route, { path: "/sales/overview", component: SalesOverviewPage }),
                    React.createElement(Route, { path: "/sales/revenue", component: SalesRevenuePage }),
                    React.createElement(Route, { path: "/sales/product", component: SalesProductPage }),
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
