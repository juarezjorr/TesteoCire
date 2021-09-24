/*!
   Copyright 2010-2020 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 ColReorder 1.5.3
 ©2010-2020 SpryMedia Ltd - datatables.net/license
*/
(function (e) {
	'function' === typeof define && define.amd
		? define(['jquery', 'datatables.net'], function (u) {
				return e(u, window, document);
		  })
		: 'object' === typeof exports
		? (module.exports = function (u, t) {
				u || (u = window);
				(t && t.fn.dataTable) || (t = require('datatables.net')(u, t).$);
				return e(t, u, u.document);
		  })
		: e(jQuery, window, document);
})(function (e, u, t, z) {
	function y(a) {
		for (var b = [], c = 0, f = a.length; c < f; c++) b[a[c]] = c;
		return b;
	}
	function v(a, b, c) {
		b = a.splice(b, 1)[0];
		a.splice(c, 0, b);
	}
	function A(a, b, c) {
		for (var f = [], h = 0, g = a.childNodes.length; h < g; h++)
			1 == a.childNodes[h].nodeType && f.push(a.childNodes[h]);
		b = f[b];
		null !== c ? a.insertBefore(b, f[c]) : a.appendChild(b);
	}
	var D = e.fn.dataTable;
	e.fn.dataTableExt.oApi.fnColReorder = function (a, b, c, f, h) {
		var g,
			m,
			k = a.aoColumns.length;
		var p = function (w, x, E) {
			if (w[x] && 'function' !== typeof w[x]) {
				var B = w[x].split('.'),
					C = B.shift();
				isNaN(1 * C) || (w[x] = E[1 * C] + '.' + B.join('.'));
			}
		};
		if (b != c)
			if (0 > b || b >= k) this.oApi._fnLog(a, 1, "ColReorder 'from' index is out of bounds: " + b);
			else if (0 > c || c >= k)
				this.oApi._fnLog(a, 1, "ColReorder 'to' index is out of bounds: " + c);
			else {
				var l = [];
				var d = 0;
				for (g = k; d < g; d++) l[d] = d;
				v(l, b, c);
				var q = y(l);
				d = 0;
				for (g = a.aaSorting.length; d < g; d++) a.aaSorting[d][0] = q[a.aaSorting[d][0]];
				if (null !== a.aaSortingFixed)
					for (d = 0, g = a.aaSortingFixed.length; d < g; d++)
						a.aaSortingFixed[d][0] = q[a.aaSortingFixed[d][0]];
				d = 0;
				for (g = k; d < g; d++) {
					var n = a.aoColumns[d];
					l = 0;
					for (m = n.aDataSort.length; l < m; l++) n.aDataSort[l] = q[n.aDataSort[l]];
					n.idx = q[n.idx];
				}
				e.each(a.aLastSort, function (w, x) {
					a.aLastSort[w].src = q[x.src];
				});
				d = 0;
				for (g = k; d < g; d++)
					(n = a.aoColumns[d]),
						'number' == typeof n.mData
							? (n.mData = q[n.mData])
							: e.isPlainObject(n.mData) &&
							  (p(n.mData, '_', q),
							  p(n.mData, 'filter', q),
							  p(n.mData, 'sort', q),
							  p(n.mData, 'type', q));
				if (a.aoColumns[b].bVisible) {
					p = this.oApi._fnColumnIndexToVisible(a, b);
					m = null;
					for (d = c < b ? c : c + 1; null === m && d < k; )
						(m = this.oApi._fnColumnIndexToVisible(a, d)), d++;
					l = a.nTHead.getElementsByTagName('tr');
					d = 0;
					for (g = l.length; d < g; d++) A(l[d], p, m);
					if (null !== a.nTFoot)
						for (l = a.nTFoot.getElementsByTagName('tr'), d = 0, g = l.length; d < g; d++)
							A(l[d], p, m);
					d = 0;
					for (g = a.aoData.length; d < g; d++)
						null !== a.aoData[d].nTr && A(a.aoData[d].nTr, p, m);
				}
				v(a.aoColumns, b, c);
				d = 0;
				for (g = k; d < g; d++) a.oApi._fnColumnOptions(a, d, {});
				v(a.aoPreSearchCols, b, c);
				d = 0;
				for (g = a.aoData.length; d < g; d++) {
					m = a.aoData[d];
					if ((n = m.anCells))
						for (v(n, b, c), l = 0, p = n.length; l < p; l++)
							n[l] && n[l]._DT_CellIndex && (n[l]._DT_CellIndex.column = l);
					'dom' !== m.src && Array.isArray(m._aData) && v(m._aData, b, c);
				}
				d = 0;
				for (g = a.aoHeader.length; d < g; d++) v(a.aoHeader[d], b, c);
				if (null !== a.aoFooter)
					for (d = 0, g = a.aoFooter.length; d < g; d++) v(a.aoFooter[d], b, c);
				(h || h === z) && e.fn.dataTable.Api(a).rows().invalidate();
				d = 0;
				for (g = k; d < g; d++)
					e(a.aoColumns[d].nTh).off('.DT'),
						this.oApi._fnSortAttachListener(a, a.aoColumns[d].nTh, d);
				e(a.oInstance).trigger('column-reorder.dt', [
					a,
					{ from: b, to: c, mapping: q, drop: f, iFrom: b, iTo: c, aiInvertMapping: q }
				]);
			}
	};
	var r = function (a, b) {
		a = new e.fn.dataTable.Api(a).settings()[0];
		if (a._colReorder) return a._colReorder;
		!0 === b && (b = {});
		var c = e.fn.dataTable.camelToHungarian;
		c && (c(r.defaults, r.defaults, !0), c(r.defaults, b || {}));
		this.s = {
			dt: null,
			enable: null,
			init: e.extend(!0, {}, r.defaults, b),
			fixed: 0,
			fixedRight: 0,
			reorderCallback: null,
			mouse: {
				startX: -1,
				startY: -1,
				offsetX: -1,
				offsetY: -1,
				target: -1,
				targetIndex: -1,
				fromIndex: -1
			},
			aoTargets: []
		};
		this.dom = { drag: null, pointer: null };
		this.s.enable = this.s.init.bEnable;
		this.s.dt = a;
		this.s.dt._colReorder = this;
		this._fnConstruct();
		return this;
	};
	e.extend(r.prototype, {
		fnEnable: function (a) {
			if (!1 === a) return fnDisable();
			this.s.enable = !0;
		},
		fnDisable: function () {
			this.s.enable = !1;
		},
		fnReset: function () {
			this._fnOrderColumns(this.fnOrder());
			return this;
		},
		fnGetCurrentOrder: function () {
			return this.fnOrder();
		},
		fnOrder: function (a, b) {
			var c = [],
				f,
				h = this.s.dt.aoColumns;
			if (a === z) {
				b = 0;
				for (f = h.length; b < f; b++) c.push(h[b]._ColReorder_iOrigCol);
				return c;
			}
			if (b) {
				h = this.fnOrder();
				b = 0;
				for (f = a.length; b < f; b++) c.push(e.inArray(a[b], h));
				a = c;
			}
			this._fnOrderColumns(y(a));
			return this;
		},
		fnTranspose: function (a, b) {
			b || (b = 'toCurrent');
			var c = this.fnOrder(),
				f = this.s.dt.aoColumns;
			return 'toCurrent' === b
				? Array.isArray(a)
					? e.map(a, function (h) {
							return e.inArray(h, c);
					  })
					: e.inArray(a, c)
				: Array.isArray(a)
				? e.map(a, function (h) {
						return f[h]._ColReorder_iOrigCol;
				  })
				: f[a]._ColReorder_iOrigCol;
		},
		_fnConstruct: function () {
			var a = this,
				b = this.s.dt.aoColumns.length,
				c = this.s.dt.nTable,
				f;
			this.s.init.iFixedColumns && (this.s.fixed = this.s.init.iFixedColumns);
			this.s.init.iFixedColumnsLeft && (this.s.fixed = this.s.init.iFixedColumnsLeft);
			this.s.fixedRight = this.s.init.iFixedColumnsRight ? this.s.init.iFixedColumnsRight : 0;
			this.s.init.fnReorderCallback && (this.s.reorderCallback = this.s.init.fnReorderCallback);
			for (f = 0; f < b; f++)
				f > this.s.fixed - 1 &&
					f < b - this.s.fixedRight &&
					this._fnMouseListener(f, this.s.dt.aoColumns[f].nTh),
					(this.s.dt.aoColumns[f]._ColReorder_iOrigCol = f);
			this.s.dt.oApi._fnCallbackReg(
				this.s.dt,
				'aoStateSaveParams',
				function (m, k) {
					a._fnStateSave.call(a, k);
				},
				'ColReorder_State'
			);
			var h = null;
			this.s.init.aiOrder && (h = this.s.init.aiOrder.slice());
			this.s.dt.oLoadedState &&
				'undefined' != typeof this.s.dt.oLoadedState.ColReorder &&
				this.s.dt.oLoadedState.ColReorder.length == this.s.dt.aoColumns.length &&
				(h = this.s.dt.oLoadedState.ColReorder);
			if (h)
				if (a.s.dt._bInitComplete) (b = y(h)), a._fnOrderColumns.call(a, b);
				else {
					var g = !1;
					e(c).on('draw.dt.colReorder', function () {
						if (!a.s.dt._bInitComplete && !g) {
							g = !0;
							var m = y(h);
							a._fnOrderColumns.call(a, m);
						}
					});
				}
			else this._fnSetColumnIndexes();
			e(c).on('destroy.dt.colReorder', function () {
				e(c).off('destroy.dt.colReorder draw.dt.colReorder');
				e.each(a.s.dt.aoColumns, function (m, k) {
					e(k.nTh).off('.ColReorder');
					e(k.nTh).removeAttr('data-column-index');
				});
				a.s.dt._colReorder = null;
				a.s = null;
			});
		},
		_fnOrderColumns: function (a) {
			var b = !1;
			if (a.length != this.s.dt.aoColumns.length)
				this.s.dt.oInstance.oApi._fnLog(
					this.s.dt,
					1,
					'ColReorder - array reorder does not match known number of columns. Skipping.'
				);
			else {
				for (var c = 0, f = a.length; c < f; c++) {
					var h = e.inArray(c, a);
					c != h && (v(a, h, c), this.s.dt.oInstance.fnColReorder(h, c, !0, !1), (b = !0));
				}
				this._fnSetColumnIndexes();
				b &&
					(e.fn.dataTable.Api(this.s.dt).rows().invalidate(),
					('' === this.s.dt.oScroll.sX && '' === this.s.dt.oScroll.sY) ||
						this.s.dt.oInstance.fnAdjustColumnSizing(!1),
					this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),
					null !== this.s.reorderCallback && this.s.reorderCallback.call(this));
			}
		},
		_fnStateSave: function (a) {
			var b,
				c,
				f = this.s.dt.aoColumns;
			a.ColReorder = [];
			if (a.aaSorting) {
				for (b = 0; b < a.aaSorting.length; b++)
					a.aaSorting[b][0] = f[a.aaSorting[b][0]]._ColReorder_iOrigCol;
				var h = e.extend(!0, [], a.aoSearchCols);
				b = 0;
				for (c = f.length; b < c; b++) {
					var g = f[b]._ColReorder_iOrigCol;
					a.aoSearchCols[g] = h[b];
					a.abVisCols[g] = f[b].bVisible;
					a.ColReorder.push(g);
				}
			} else if (a.order) {
				for (b = 0; b < a.order.length; b++) a.order[b][0] = f[a.order[b][0]]._ColReorder_iOrigCol;
				h = e.extend(!0, [], a.columns);
				b = 0;
				for (c = f.length; b < c; b++)
					(g = f[b]._ColReorder_iOrigCol), (a.columns[g] = h[b]), a.ColReorder.push(g);
			}
		},
		_fnMouseListener: function (a, b) {
			var c = this;
			e(b)
				.on('mousedown.ColReorder', function (f) {
					c.s.enable && 1 === f.which && c._fnMouseDown.call(c, f, b);
				})
				.on('touchstart.ColReorder', function (f) {
					c.s.enable && c._fnMouseDown.call(c, f, b);
				});
		},
		_fnMouseDown: function (a, b) {
			var c = this,
				f = e(a.target).closest('th, td').offset();
			b = parseInt(e(b).attr('data-column-index'), 10);
			b !== z &&
				((this.s.mouse.startX = this._fnCursorPosition(a, 'pageX')),
				(this.s.mouse.startY = this._fnCursorPosition(a, 'pageY')),
				(this.s.mouse.offsetX = this._fnCursorPosition(a, 'pageX') - f.left),
				(this.s.mouse.offsetY = this._fnCursorPosition(a, 'pageY') - f.top),
				(this.s.mouse.target = this.s.dt.aoColumns[b].nTh),
				(this.s.mouse.targetIndex = b),
				(this.s.mouse.fromIndex = b),
				this._fnRegions(),
				e(t)
					.on('mousemove.ColReorder touchmove.ColReorder', function (h) {
						c._fnMouseMove.call(c, h);
					})
					.on('mouseup.ColReorder touchend.ColReorder', function (h) {
						c._fnMouseUp.call(c, h);
					}));
		},
		_fnMouseMove: function (a) {
			var b = this;
			if (null === this.dom.drag) {
				if (
					5 >
					Math.pow(
						Math.pow(this._fnCursorPosition(a, 'pageX') - this.s.mouse.startX, 2) +
							Math.pow(this._fnCursorPosition(a, 'pageY') - this.s.mouse.startY, 2),
						0.5
					)
				)
					return;
				this._fnCreateDragNode();
			}
			this.dom.drag.css({
				left: this._fnCursorPosition(a, 'pageX') - this.s.mouse.offsetX,
				top: this._fnCursorPosition(a, 'pageY') - this.s.mouse.offsetY
			});
			var c = this.s.mouse.toIndex;
			a = this._fnCursorPosition(a, 'pageX');
			for (
				var f = function (d) {
						for (; 0 <= d; ) {
							d--;
							if (0 >= d) return null;
							if (b.s.aoTargets[d + 1].x !== b.s.aoTargets[d].x) return b.s.aoTargets[d];
						}
					},
					h = function () {
						for (var d = 0; d < b.s.aoTargets.length - 1; d++)
							if (b.s.aoTargets[d].x !== b.s.aoTargets[d + 1].x) return b.s.aoTargets[d];
					},
					g = function () {
						for (var d = b.s.aoTargets.length - 1; 0 < d; d--)
							if (b.s.aoTargets[d].x !== b.s.aoTargets[d - 1].x) return b.s.aoTargets[d];
					},
					m = 1;
				m < this.s.aoTargets.length;
				m++
			) {
				var k = f(m);
				k || (k = h());
				var p = k.x + (this.s.aoTargets[m].x - k.x) / 2;
				if (this._fnIsLtr()) {
					if (a < p) {
						var l = k;
						break;
					}
				} else if (a > p) {
					l = k;
					break;
				}
			}
			l
				? (this.dom.pointer.css('left', l.x), (this.s.mouse.toIndex = l.to))
				: (this.dom.pointer.css('left', g().x), (this.s.mouse.toIndex = g().to));
			this.s.init.bRealtime &&
				c !== this.s.mouse.toIndex &&
				(this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex, this.s.mouse.toIndex),
				(this.s.mouse.fromIndex = this.s.mouse.toIndex),
				('' === this.s.dt.oScroll.sX && '' === this.s.dt.oScroll.sY) ||
					this.s.dt.oInstance.fnAdjustColumnSizing(!1),
				this._fnRegions());
		},
		_fnMouseUp: function (a) {
			e(t).off('.ColReorder');
			null !== this.dom.drag &&
				(this.dom.drag.remove(),
				this.dom.pointer.remove(),
				(this.dom.drag = null),
				(this.dom.pointer = null),
				this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex, this.s.mouse.toIndex, !0),
				this._fnSetColumnIndexes(),
				('' === this.s.dt.oScroll.sX && '' === this.s.dt.oScroll.sY) ||
					this.s.dt.oInstance.fnAdjustColumnSizing(!1),
				this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),
				null !== this.s.reorderCallback && this.s.reorderCallback.call(this));
		},
		_fnRegions: function () {
			var a = this.s.dt.aoColumns,
				b = this._fnIsLtr();
			this.s.aoTargets.splice(0, this.s.aoTargets.length);
			var c = e(this.s.dt.nTable).offset().left,
				f = [];
			e.each(a, function (m, k) {
				if (k.bVisible && 'none' !== k.nTh.style.display) {
					k = e(k.nTh);
					var p = k.offset().left;
					b && (p += k.outerWidth());
					f.push({ index: m, bound: p });
					c = p;
				} else f.push({ index: m, bound: c });
			});
			var h = f[0];
			a = e(a[h.index].nTh).outerWidth();
			this.s.aoTargets.push({ to: 0, x: h.bound - a });
			for (h = 0; h < f.length; h++) {
				a = f[h];
				var g = a.index;
				a.index < this.s.mouse.fromIndex && g++;
				this.s.aoTargets.push({ to: g, x: a.bound });
			}
			0 !== this.s.fixedRight &&
				this.s.aoTargets.splice(this.s.aoTargets.length - this.s.fixedRight);
			0 !== this.s.fixed && this.s.aoTargets.splice(0, this.s.fixed);
		},
		_fnCreateDragNode: function () {
			var a = '' !== this.s.dt.oScroll.sX || '' !== this.s.dt.oScroll.sY,
				b = this.s.dt.aoColumns[this.s.mouse.targetIndex].nTh,
				c = b.parentNode,
				f = c.parentNode,
				h = f.parentNode,
				g = e(b).clone();
			this.dom.drag = e(h.cloneNode(!1))
				.addClass('DTCR_clonedTable')
				.append(e(f.cloneNode(!1)).append(e(c.cloneNode(!1)).append(g[0])))
				.css({
					position: 'absolute',
					top: 0,
					left: 0,
					width: e(b).outerWidth(),
					height: e(b).outerHeight()
				})
				.appendTo('body');
			this.dom.pointer = e('<div></div>')
				.addClass('DTCR_pointer')
				.css({
					position: 'absolute',
					top: a
						? e('div.dataTables_scroll', this.s.dt.nTableWrapper).offset().top
						: e(this.s.dt.nTable).offset().top,
					height: a
						? e('div.dataTables_scroll', this.s.dt.nTableWrapper).height()
						: e(this.s.dt.nTable).height()
				})
				.appendTo('body');
		},
		_fnSetColumnIndexes: function () {
			e.each(this.s.dt.aoColumns, function (a, b) {
				e(b.nTh).attr('data-column-index', a);
			});
		},
		_fnCursorPosition: function (a, b) {
			return -1 !== a.type.indexOf('touch') ? a.originalEvent.touches[0][b] : a[b];
		},
		_fnIsLtr: function () {
			return 'rtl' !== e(this.s.dt.nTable).css('direction');
		}
	});
	r.defaults = {
		aiOrder: null,
		bEnable: !0,
		bRealtime: !0,
		iFixedColumnsLeft: 0,
		iFixedColumnsRight: 0,
		fnReorderCallback: null
	};
	r.version = '1.5.3';
	e.fn.dataTable.ColReorder = r;
	e.fn.DataTable.ColReorder = r;
	'function' == typeof e.fn.dataTable &&
	'function' == typeof e.fn.dataTableExt.fnVersionCheck &&
	e.fn.dataTableExt.fnVersionCheck('1.10.8')
		? e.fn.dataTableExt.aoFeatures.push({
				fnInit: function (a) {
					var b = a.oInstance;
					a._colReorder
						? b.oApi._fnLog(a, 1, 'ColReorder attempted to initialise twice. Ignoring second')
						: ((b = a.oInit), new r(a, b.colReorder || b.oColReorder || {}));
					return null;
				},
				cFeature: 'R',
				sFeature: 'ColReorder'
		  })
		: alert(
				'Warning: ColReorder requires DataTables 1.10.8 or greater - www.datatables.net/download'
		  );
	e(t).on('preInit.dt.colReorder', function (a, b) {
		if ('dt' === a.namespace) {
			a = b.oInit.colReorder;
			var c = D.defaults.colReorder;
			if (a || c) (c = e.extend({}, a, c)), !1 !== a && new r(b, c);
		}
	});
	e.fn.dataTable.Api.register('colReorder.reset()', function () {
		return this.iterator('table', function (a) {
			a._colReorder.fnReset();
		});
	});
	e.fn.dataTable.Api.register('colReorder.order()', function (a, b) {
		return a
			? this.iterator('table', function (c) {
					c._colReorder.fnOrder(a, b);
			  })
			: this.context.length
			? this.context[0]._colReorder.fnOrder()
			: null;
	});
	e.fn.dataTable.Api.register('colReorder.transpose()', function (a, b) {
		return this.context.length && this.context[0]._colReorder
			? this.context[0]._colReorder.fnTranspose(a, b)
			: a;
	});
	e.fn.dataTable.Api.register('colReorder.move()', function (a, b, c, f) {
		this.context.length &&
			(this.context[0]._colReorder.s.dt.oInstance.fnColReorder(a, b, c, f),
			this.context[0]._colReorder._fnSetColumnIndexes());
		return this;
	});
	e.fn.dataTable.Api.register('colReorder.enable()', function (a) {
		return this.iterator('table', function (b) {
			b._colReorder && b._colReorder.fnEnable(a);
		});
	});
	e.fn.dataTable.Api.register('colReorder.disable()', function () {
		return this.iterator('table', function (a) {
			a._colReorder && a._colReorder.fnDisable();
		});
	});
	return r;
});
